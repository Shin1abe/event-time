import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";
import { useEtContext } from '../providers/EtProvider';


const EventUpdateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    let eventIdtmp: string = ""; if (typeof eventid === "string") { eventIdtmp = eventid };
    const initialDays: Date[] = [];

    //■  useEtContext
    const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

    //■  trpc query
    // [Event_findWhereMany]
    const { data: etEvents } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const etEvent = etEvents !== undefined && etEvents.length > 0 ? etEvents[0] : null;
    // [EventDate_findWhereMany]
    const { data: etEventDates, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const eteventDates = etEventDates !== undefined && etEventDates.length > 0 ? etEventDates as EventDate[] : [];
    const eventDateArray: Date[] = eteventDates.map(item => new Date(item.eventDate));
    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

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
    const eventdateCreate = async (newEvent: { eventId: string; eventDate: string; }) => {
        await eventdateCreateMutation.mutate({ eventId: newEvent.eventId, eventDate: newEvent.eventDate });
    };
    // [EventDate_delete]
    const EventDateDeleteMutation = trpc.useMutation(["EventDate_delete"]);
    // [EventUserSel_delete]
    const EventUserSelDeleteMutation = trpc.useMutation(["EventUserSel_delete"]);
    // [EventUserSel_create]
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"]);

    //■  useState
    const [eventName, setEventName] = useState<string>(etEvent?.eventName as string);
    const [eventMemo, setEventMemo] = useState<string>(etEvent?.eventMemo as string);
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(eventDateArray);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //■　uttil
    //画面選択eventDates.日付 === etEventUserSels.eventDateは保持し、それ以外のデータは除く
    const filterEventUserSels = (etEventUserSels: EventUserSel[], eventDates: Date[]) => {
        return etEventUserSels.filter(sel => {
            let selDate = new Date(sel.eventDate).getTime();
            return eventDates.some(date => new Date(date).getTime() === selDate);
        });
    }

    //■  event
    const clearButton = () => setEventsDates(initialDays);
    // イベント更新ボタン押下
    const eventUpdateButtonClick = useCallback(async () => {
        if (eventName?.length === 0) { alert("イベント名が設定されていません"); return }//TODO TOAST
        if (eventDates?.length === 0) { alert("日程候補が設定されていません"); return }//TODO TOAST
        try {
            const eventid = eventIdtmp;
            await eventUpdate(
                { eventId: eventid, eventName: eventName, eventUrl: etEvent?.eventUrl as string, eventMemo: eventMemo }
            );
            try {
                if (!etEventUserSels || !eventDates) {
                    console.log("etEventUserSelsまたはeventDatesが定義されていません");
                    return;
                }
                // ■
                // ■  Event Update
                // ■
                console.log("1")
                await eventUpdate({ eventId: eventid, eventName: eventName, eventUrl: etEvent?.eventUrl as string, eventMemo: eventMemo })
                // ------------------------------------------------------------------------
                // 日程を変更した場合
                // ・EventeDate　：全削除→全追加
                // ・EventUserSel：全削除、追加は画面選択eventDate === EventUserSel
                //                 TODO:画面選択したがEventUserSelしたものをレコードとして追加すべきか
                // ------------------------------------------------------------------------
                // ■  EventDate Delete
                console.log("2")
                eteventDates?.map(async (eventdate) => {
                    await EventDateDeleteMutation.mutate({ id: eventdate.id });
                })
                // ■  EventDate Create
                console.log("3")
                eventDates?.map(async (eventdate) => {
                    await eventdateCreate({ eventId: eventid, eventDate: eventdate.toISOString() });
                })
                // ■  EventUserSels Delete
                console.log("4")
                // console.log("etEventUserSels",etEventUserSels)
                etEventUserSels?.map(async (d) => {
                    await EventUserSelDeleteMutation.mutate({ id: d.id });
                })
                // ■  EventUserSels Create
                console.log("5")
                const _filterEventUserSels = filterEventUserSels(etEventUserSels, eventDates)
                _filterEventUserSels?.forEach(async (d: any) => {
                    await EventUserSelCreateMutation.mutate({
                        eventId: d.eventId,
                        eventDate: d.eventDate ? new Date(d.eventDate).toISOString() : "",
                        userId: d.userId,
                        userSel: d.userSel,
                    });
                });
            } catch (err) {
                console.log(err)
            }
            router.push({
                pathname: '/components/AttendMng',
                query: { eventid: eventid },
            }).then(() => {
                router.reload();
            });
        } catch (error) {
            console.error("エラーが発生しました:", error);
        }
    }, [eventName, eventDates]);

    //イベント作成ダイアログfooter　
    const footer =
        eventDates && eventDates.length > 0 ? (
            <div className='grid-cols-2 flex'>
                <div className='flex-3 text-left'>選択日数： {eventDates.length} 日.</div>
                <div className='flex-1 text-right'>
                    <Button variant="outline" onClick={clearButton}>clear</Button>
                </div>
            </div>
        ) : (<></>);

    return (
        <div >
            <Dialog defaultOpen={true}>
                <DialogTrigger asChild>
                    <Button className="fixed-button mb-3" variant="default">イベント更新</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>イベント更新</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <div className="flex-auto w-full">
                            <div className="flex-auto">
                                <Label htmlFor="eventName" className='font-bold'>イベント名</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <Input
                                    id="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    defaultValue="イベント名を入力してください"
                                    className="m-1"
                                />
                                <br />
                                <Label htmlFor="username" className='font-bold'>日程候補</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <div>カレンダーで候補日を選択</div>
                                <div className='preview flex min-h-[250px] w-full justify-center p-1 items-center border border-gray-300 rounded-md overflow-auto'>
                                    <div>
                                        <DayPicker
                                            mode="multiple"
                                            min={0}
                                            style={{ margin: 0 }} // Add this line
                                            selected={eventDates}
                                            onSelect={setEventsDates}
                                            footer={footer}
                                        />
                                    </div>
                                </div>
                                <Label htmlFor="eventName" className='font-bold'>候補日</Label>
                                <div className='ml-14 whitespace-nowrap'>
                                    {eventDates?.map((day, index) => (
                                        <p key={index} className="inline-block">
                                            {day.toLocaleDateString()}({["日", "月", "火", "水", "木", "金", "土"][day.getDay()]})
                                            {index !== (eventDates.length - 1) && '、'}
                                        </p>
                                    ))}
                                </div>
                                <br />
                                <Label htmlFor="eventName" className='font-bold'>メモ</Label>
                                <div>イベントの概要など参加者に連絡しておきたいことを記述することができます。</div>
                                <Textarea
                                    className="w-full m-1"
                                    placeholder="例）旅行の日程を調整しましょう。締め切りは〇／〇です。"
                                    value={eventMemo}
                                    onChange={(e) => setEventMemo(e.target.value)} />
                            </div>
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={eventUpdateButtonClick}
                            disabled={isSubmitting}>
                            イベント更新
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventUpdateDialog
