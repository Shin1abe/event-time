import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import cuid from 'cuid';
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

const EventCreateDialog = () => {
    //■  initial
    const router = useRouter();
    const initialDays: Date[] = [];

    //■  useEtContext
    const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

    //■  useState
    const [eventName, setEventName] = useState<string>("");
    const [eventMemo, setEventMemo] = useState<string>("");;
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(initialDays);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //■  trpc
    // const { data: etEvent, refetch } = trpc.useQuery(["Event_findMany"]);
    // const { data: etEventDate, error } = trpc.useQuery(['EventDate_findMany']);
    const eventCreateMutation = trpc.useMutation(["Event_create"]);
    const eventCreate = async (newEvent: {
        eventId: string;
        eventName: string;
        eventUrl: string;
        eventMemo: string;
    }) => {
        await eventCreateMutation.mutate(newEvent);
    };
    const eventdateCreateMutation = trpc.useMutation(["EventDate_create"]);//TODO
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

    // イベント作成ボタン押下
    const eventCreateButtonClick = async () => {
        if (eventName.length === 0) { alert("イベント名が設定されていません"); return }//TODO TOAST
        if (eventDates?.length === 0) { alert("日程候補が設定されていません"); return }//TODO TOAST
        try {
            const eventid = cuid();
            const urlParts = new URL(window.location.href);
            const baseURL = `${urlParts.protocol}//${urlParts.host}/`;
            console.log(baseURL)
            const eventurl = baseURL + "components/AttendMng?eventid=" + eventid;
            console.log(eventurl)
            await eventCreate({ eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo });

            eventDates?.map(async (eventdate) => {
                try {
                    await eventdateCreate({ eventId: eventid, eventDate: eventdate.toISOString() });
                    // console.log("eventdateCreate= " + eventid + " eventdateCreate= " + eventdate.toISOString())
                } catch (err) {
                    console.log(err)
                }
            })
            setCurentEventId(eventid)
            router.push({
                pathname: '/components/AttendMng',
                query: { eventid: eventid },
            });
        } catch (error) {
            console.error("エラーが発生しました:", error);
        }
    };

    //イベント作成ダイアログfooter　
    const footer =
        eventDates && eventDates.length > 0 ? (
            <div className='grid-cols-2 flex'>
                <div className='flex-3 text-left'>選択日数： {eventDates.length} 日.</div>
                <div className='flex-1 text-right'>
                    <Button variant="outline" onClick={clearButton}>clear</Button>
                </div>
            </div>
        ) : (
            <></>
        );

    return (
        <div >
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="fixed-button mb-3" variant="default">イベント作成</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>イベント作成</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <div className="flex-auto w-full">
                            <div className="flex-auto" >
                                <Label htmlFor="eventName" className=' font-bold' >イベント名</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <Input
                                    id="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    defaultValue="イベント名を入力してください"
                                    className="m-1"
                                />
                                <br />
                                <Label htmlFor="username" className=' font-bold' >日程候補</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <p>カレンダーで候補日を選択</p>
                                {/* https://react-day-picker.js.org/ */}
                                <div className='preview flex min-h-[250px] w-full justify-center p-1 items-center border border-gray-300 rounded-md  overflow-auto'>
                                    <DayPicker
                                        mode="multiple"
                                        min={0}
                                        style={{ margin: 0 }} // Add this line
                                        selected={eventDates}
                                        onSelect={setEventsDates}
                                        footer={footer}
                                    />
                                </div>
                                <Label htmlFor="eventName" className=' font-bold'>候補日</Label>
                                <div className='ml-14 whitespace-nowrap'>
                                    {eventDates?.map((day, index) => (
                                        <p key={index} className="inline-block">
                                            {day.toLocaleDateString()}({["日", "月", "火", "水", "木", "金", "土"][day.getDay()]})
                                            {index !== (eventDates.length - 1) && ', '}
                                        </p>
                                    ))}
                                </div>
                                <br />
                                <Label htmlFor="eventName" className=' font-bold'>メモ</Label>
                                <p>イベントの概要など参加者に連絡しておきたいことを記述することができます。</p>
                                <Textarea
                                    className="w-full m-1"
                                    placeholder="例）旅行の日程を調整しましょう。締め切りは〇／〇です。"
                                    value={eventMemo}
                                    onChange={(e) => setEventMemo(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={eventCreateButtonClick}
                            disabled={isSubmitting}
                        >
                            イベント作成
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventCreateDialog
