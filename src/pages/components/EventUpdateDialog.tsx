import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Badge } from '../../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Textarea } from '../../ui/textarea'
import { Label } from '../../ui/label'
import { EventDate, EventUserSel } from "@prisma/client";
import { lEventDate } from '@/type/EventType';
import { lStrageCrud } from '@/utils/LStrageCRUD';


const EventUpdateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    let eventIdtmp = "";
    if (typeof eventid === "string") { eventIdtmp = eventid };
    const initialDays: Date[] = [];

    //■  useEtContext
    // const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

    //■  trpc query
    // [Event_findWhereMany]
    const { data: etEvents } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const etEvent = etEvents !== undefined && etEvents.length > 0 ? etEvents[0] : null;
    // [EventDate_findWhereMany]
    const { data: etEventDates, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const eteventDates = etEventDates !== undefined && etEventDates.length > 0 ? etEventDates as EventDate[] : [];
    const eventDateArray: Date[] = eteventDates.map(item => new Date(item.eventDate));
    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    //■  trpc mustaiton
    //  [Event_update]
    const eventUpdateMutation = trpc.useMutation(["Event_update"]);
    const eventUpdate = async (newEvent: {
        eventId: string; eventName: string; eventUrl: string; eventMemo: string;
    }) => { await eventUpdateMutation.mutate(newEvent); };
    //  [EventDate_create]
    const eventdateCreateMutation = trpc.useMutation(["EventDate_create"]
        , { onSuccess: () => eventDateRefetch(), }
    );
    // [EventDate_delete]
    const EventDateDeleteMutation = trpc.useMutation(["EventDate_delete"]);
    // [EventUserSel_delete]
    const EventUserSelDeleteMutation = trpc.useMutation(["EventUserSel_delete"]);
    // [EventUserSel_create]
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"]
        , { onSuccess: () => eventUserSelRefetch(), }
    );

    //■ state hooks
    const [eventName, setEventName] = useState<string | null>(etEvent?.eventName as string);
    const [eventMemo, setEventMemo] = useState<string | null>(etEvent?.eventMemo as string);
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(eventDateArray);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //■uttil
    //eventDatesとetEventUserSelsを日付をキーにマージする。その際、eventDateは保持し、それ以外のデータは除く
    const filterEventUserSels: (etEventUserSels: EventUserSel[], eventDates: Date[]) => EventUserSel[] = (etEventUserSels, eventDates) => {
        const samedate: EventUserSel[] = etEventUserSels.filter(sel => {
            const selDate = new Date(sel.eventDate).getTime();
            return eventDates.some(date => new Date(date).getTime() === selDate);
        }).map(sel => {
            const eventDateJST = new Date(sel.eventDate).toLocaleString('ja-JP', {
                timeZone: 'Asia/Tokyo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            return { ...sel, eventDate: new Date(eventDateJST) };
        });

        // すべてのユーザーIDを取得
        const allUserIds = Array.from(new Set(etEventUserSels.map(entry => entry.userId)));

        // 既存のイベント日付を取得
        const existingEventDates = new Set(etEventUserSels.map(entry => new Date(entry.eventDate).getTime()));

        // eventDatesにしかない日付ごとに新しいレコードを作成して追加
        const newEntries = eventDates
            .filter(event => !existingEventDates.has(event.getTime()))
            .flatMap(event => allUserIds.map(userId => ({
                id: 0,
                eventId: eventIdtmp,
                eventDate: event,
                userId: userId,
                userSel: "-",
                createdAt: new Date(),
            })));
        //samedate.map(d => console.log("samedate", d))
        //newEntries.map(d => console.log("newEntries", d))
        return [...samedate, ...newEntries];
    };

    //■ event
    const clearButton = () => setEventsDates(initialDays);
    const getCandidate = () => {
        return eventDates?.map((day) => (
            `${day.getMonth() + 1}/${day.getDate()}(${["日", "月", "火", "水", "木", "金", "土"][day.getDay()]})`
        )).join(', ')
    }

    // イベント更新ボタン押下
    const eventUpdateButtonClick = useCallback(async () => {
        if (eventName?.length === 0) { setError("イベント名を設定してください。"); return }
        if (eventDates?.length === 0) { setError("日程候補日を設定してください。"); return }
        setIsSubmitting(true);
        try {
            const eventid = eventIdtmp;
            if (!etEventUserSels || !eventDates) {
                console.log("etEventUserSelsまたはeventDatesが定義されていません");
                return;
            }
            // ■
            // ■  Event Update
            // ■
            //console.log("1")
            await eventUpdate({ eventId: eventid, eventName: eventName as string, eventUrl: etEvent?.eventUrl as string, eventMemo: eventMemo as string })
            // ------------------------------------------------------------------------
            // 日程を変更した場合
            // ・EventeDate：全削除→全追加
            // ・EventUserSel：全削除、追加は画面選択eventDate === EventUserSel
            //                 TODO:画面選択したがEventUserSelしたものをレコードとして追加すべきか
            // ------------------------------------------------------------------------
            // ■  EventDate Delete
            //console.log("2")
            if (eteventDates) {
                await Promise.all(
                    eteventDates?.map(eventdate => EventDateDeleteMutation.mutateAsync({ id: eventdate.id }))
                )
            }
            // ■  EventUserSels Delete
            //console.log("4")
            // console.log("etEventUserSels",etEventUserSels)
            if (etEventUserSels) {
                await Promise.all(etEventUserSels?.map(async (d) => {
                    EventUserSelDeleteMutation.mutateAsync({ id: d.id });
                }))
            }            // ■  EventDate Create
            //console.log("3")
            //console.log('eventDates', eventDates)
            if (eventDates) {
                await Promise.all(
                    eventDates.map(eventdate => eventdateCreateMutation.mutateAsync({ eventId: eventid, eventDate: eventdate.toISOString() }))
                );
            }
            // ■  EventUserSels Create
            console.log("5-start")
            const _filterEventUserSels = filterEventUserSels(etEventUserSels, eventDates)
            _filterEventUserSels.map(d => console.log("_filterEventUserSels", d))
            if (_filterEventUserSels) {
                await Promise.all(_filterEventUserSels.map(d =>
                    EventUserSelCreateMutation.mutateAsync({
                        eventId: d.eventId,
                        eventDate: d.eventDate ? new Date(d.eventDate).toISOString() : "",
                        userId: d.userId,
                        userSel: d.userSel
                    })
                ));
            }
            console.log("5-end")

            //ローカルファイルに対象イベント更新
            let eventdates: lEventDate[] = [];
            if (eventDates) {
                eventdates = eventDates?.map((eventdate) => {
                    return { eventId: eventid, eventDate: new Date(eventdate) }
                });
            }
            // console.log("6")
            const data = lStrageCrud(
                'UPD',
                eventIdtmp,
                { eventId: eventIdtmp, eventName: eventName as string, eventUrl: etEvent?.eventUrl as string, eventMemo: eventMemo as string },
                eventdates
            )

            router.push({
                pathname: '/components/AttendMng',
                query: { eventid: eventid },
            }).then(() => {
                router.reload();
            });
        } catch (error) {
            console.error("エラーが発生しました:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [eventName, eventMemo, eventDates, etEventUserSels, eteventDates]);

    //イベント作成ダイアログfooter
    const footer =
        eventDates && eventDates.length > 0 ? (
            <div className="flex justify-end p-1">
                <Button onClick={clearButton} className=' pxy-0  h-40px'>clear</Button>
            </div>
        ) : (
            <div className='h-9 px-4 py-2 pxy-0 h-40px p-1'></div>
        );

    return (
        <div >
            <Dialog defaultOpen={true}>
                <DialogTrigger asChild>
                    <Button className="fixed-button mb-3">イベント更新</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>イベント更新</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {error && <div className="text-red-600">{error}</div>}
                        <div className="flex-auto w-full">
                            <div className="flex-auto">
                                <Label htmlFor="eventName" className='font-bold'>イベント名</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <Input
                                    id="eventName"
                                    value={eventName as string}
                                    onChange={(e) => { setEventName(e.target.value); setError(null) }}
                                    defaultValue="イベント名を入力してください"
                                    className="m-1"
                                />
                                <br />
                                <Label htmlFor="username" className='font-bold'>日程候補</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <div>カレンダーで候補日を選択</div>
                                <div className='preview flex min-h-[250px] w-full justify-center p-1 items-center border border-gray-300 rounded-md  overflow-auto'>
                                    <div>
                                        <DayPicker
                                            mode="multiple"
                                            min={0}
                                            style={{ margin: 0 }} // Add this line
                                            selected={eventDates}
                                            onSelect={setEventsDates}
                                            onDayClick={() => setError(null)}
                                            footer={footer}
                                            className='min-h-12 m-1'
                                        />
                                    </div>
                                </div>
                                <Label htmlFor="eventName" className='font-bold'>候補日</Label>
                                <div className='whitespace-nowrap'>
                                    <Textarea readOnly className="w-full  p-1 border border-gray-300  min-h-4" value={getCandidate()} />
                                </div>
                                <Label htmlFor="eventName" className='font-bold'>メモ</Label>
                                <div>イベントの概要など参加者に連絡しておきたいことを記述することができます。</div>
                                <Textarea
                                    className="w-full p-1 border border-gray-300  min-h-4"
                                    placeholder="例）旅行の日程を調整しましょう。締め切りは〇／〇です。"
                                    value={eventMemo as string}
                                    onChange={(e) => setEventMemo(e.target.value)} />
                            </div>
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={eventUpdateButtonClick}
                            disabled={isSubmitting}>
                            {isSubmitting ? '送信中...' : 'イベント更新'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventUpdateDialog
