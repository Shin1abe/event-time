import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import cuid from 'cuid';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Badge } from '../../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Textarea } from '../../ui/textarea'
import { Label } from '../../ui/label'
import { useEtContext } from '../../providers/EtProvider';
import { lStrageCrud } from '@/utils/LStrageCRUD';
import { lEventDate } from '@/type/EventType';

const EventCreateDialog = () => {
    //■  initial
    const router = useRouter();
    const initialDays: Date[] = [];

    //■  useEtContext
    const { setIsCoordinator, setCurentEventId } = useEtContext()

    //■  useState
    const [eventName, setEventName] = useState<string>("");
    const [eventMemo, setEventMemo] = useState<string>("");;
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(initialDays);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //■  trpc
    const eventCreateMutation = trpc.useMutation(["Event_create"]);
    const eventCreate = async (newEvent: {
        eventId: string;
        eventName: string;
        eventUrl: string;
        eventMemo: string;
    }) => {
        await eventCreateMutation.mutate(newEvent);
    };
    const eventdateCreateMutation = trpc.useMutation(["EventDate_create"]);
    const eventdateCreate = async (newEvent: {
        eventId: string;
        eventDate: string;
    }) => {
        await eventdateCreateMutation.mutate({
            eventId: newEvent.eventId,
            eventDate: newEvent.eventDate, // 日付型のまま渡す
        });
    };

    //■  event
    const clearButton = () => setEventsDates(initialDays);
    const getCandidate = () => {
        // setError(null);
        return eventDates?.map((day) => (
            `${day.getMonth() + 1}/${day.getDate()}(${["日", "月", "火", "水", "木", "金", "土"][day.getDay()]})`
        )).join(', ')
    }

    // イベント作成ボタン押下
    const eventCreateButtonClick = async () => {
        if (eventName.length === 0) { setError("イベント名を設定してください。"); return }
        if (eventDates?.length === 0) { setError("日程候補日を設定してください。"); return }
        setIsSubmitting(true);
        try {
            const eventid = cuid();
            const urlParts = new URL(window.location.href);
            const baseURL = process.env.NEXT_PUBLIC_HOST ?
                `https://${process.env.NEXT_PUBLIC_HOST}/` :
                `${urlParts.protocol}//${urlParts.host}/`;
            const eventurl = baseURL + "components/AttendMng?eventid=" + eventid;
            await eventCreate({ eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo });

            eventDates?.map(async (eventdate) => {
                try {
                    await eventdateCreate({ eventId: eventid, eventDate: eventdate.toISOString() });
                } catch (err) {
                    console.log(err)
                }
            })
            setCurentEventId(eventid)
            setIsCoordinator(true)
            let eventdates: lEventDate[] = [];
            if (eventDates) {
                eventdates = eventDates?.map((eventdate) => {
                    return { eventId: eventid, eventDate: new Date(eventdate) }
                });
            }
            const data = lStrageCrud(
                'CRT',
                eventid,
                { eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo },
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
    };

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
        <div className=' bg-blue-400'>
            <Dialog >
                <DialogTrigger asChild>
                    <Button className="fixed-button mb-3 bg-blue-500 text-blue-200 text-base font-bold" >イベント作成</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]  bg-slate-700">
                    <DialogHeader>
                        <DialogTitle>イベント作成</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {error && <div className="text-red-600">{error}</div>}
                        <div className="flex-auto w-full">
                            <div className="flex-auto" >
                                <Label htmlFor="eventName" className=' font-bold' >イベント名</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <Input
                                    id="eventName"
                                    placeholder='イベント名を入力してください'
                                    value={eventName}
                                    onChange={(e) => { setEventName(e.target.value); setError(null) }
                                    }
                                    className="m-1 bg-black"
                                />
                                <Label htmlFor="username" className=' font-bold' >日程候補</Label>
                                <Badge className='ml-1'>必須</Badge>
                                {/* https://react-day-picker.js.org/ */}
                                <div className='preview flex min-h-[250px] w-full justify-center p-0 items-center border border-gray-300 rounded-md  overflow-auto bg-black'>
                                    <DayPicker
                                        mode="multiple"
                                        min={0}
                                        style={{ margin: 0 }} // Add this line
                                        selected={eventDates}
                                        onSelect={setEventsDates}
                                        onDayClick={() => setError(null)}
                                        footer={footer}
                                        className='min-h-12 m-1 text-2xl'
                                        disabled={{ before: new Date() }}
                                    />
                                </div>
                                <Label htmlFor="eventName" className='font-bold'>候補日</Label>
                                <div className='whitespace-nowrap'>
                                    <Textarea readOnly className="w-full bg-slate-800 text-white p-1 border border-gray-300 min-h-4 text-base" value={getCandidate()} disabled
                                    />
                                </div>
                                <Label htmlFor="eventName" className='font-bold'>メモ</Label>
                                <div>参加者に連絡しておきたいことを記述</div>
                                <Textarea
                                    className="w-full p-1 border border-gray-300  min-h-3 text-white"
                                    placeholder="例）旅行の日程を調整しましょう。締め切りは〇／〇です。"
                                    value={eventMemo}
                                    onChange={(e) => setEventMemo(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <div className=' text-xs'>※作成したイベント情報はご使用Devie(browser)でのみ編集可能</div>
                        <Button
                            className=' bg-blue-500 text-blue-200 text-base font-bold'
                            type="submit"
                            onClick={eventCreateButtonClick}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '送信中...' : 'イベント作成'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventCreateDialog
