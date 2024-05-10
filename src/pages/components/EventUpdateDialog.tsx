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
import { Filter } from 'lucide-react';


const EventUpdateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    let eventIdtmp: string = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }

    const initialDays: Date[] = [];

    //■  useEtContext
    const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

    //■  trpc query
    const { data: etEvents } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const etEvent = etEvents !== undefined && etEvents.length > 0 ? etEvents[0] : null;

    const { data: etEventDates } = trpc.useQuery(['EventDate_findWhereMany', { eventId: eventIdtmp }]);
    const eteventDates = etEventDates !== undefined && etEventDates.length > 0 ? etEventDates as EventDate[] : [];
    const eventDateArray: Date[] = eteventDates.map(item => new Date(item.eventDate));

    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);
    console.log(etEventUserSels)

    //■  useState
    const [eventName, setEventName] = useState<string>(etEvent?.eventName as string);
    const [eventMemo, setEventMemo] = useState<string>(etEvent?.eventMemo as string);
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(eventDateArray);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //■  trpc mustaiton
    const eventUpdateMutation = trpc.useMutation(["Event_update"]);
    const eventUpdate = async (newEvent: {
        eventId: string;
        eventName: string;
        eventUrl: string;
        eventMemo: string;
    }) => {
        await eventUpdateMutation.mutate(newEvent);
    };

    const eventdateUpdateMutation = trpc.useMutation(["EventDate_update"]);
    const eventdateUpdate = async (newEvent: {
        id: number;
        eventId: string;
        eventDate: string;
    }) => {
        await eventdateUpdateMutation.mutate({
            id: newEvent.id,
            eventId: newEvent.eventId,
            eventDate: newEvent.eventDate, // 日付型のまま渡す
        });
    };



    //■  event
    const clearButton = () => setEventsDates(initialDays);

    // イベント更新ボタン押下
    const eventUpdateButtonClick = async () => {
        if (eventName?.length === 0) { alert("イベント名が設定されていません"); return }//TODO TOAST
        if (eventDates?.length === 0) { alert("日程候補が設定されていません"); return }//TODO TOAST
        try {
            const eventid = eventIdtmp;
            const urlParts = new URL(window.location.href);
            const baseURL = `${urlParts.protocol}//${urlParts.host}/`;
            console.log(baseURL)
            const eventurl = baseURL + "components/AttendMng?eventid=" + eventid;
            console.log(eventurl)
            await eventUpdate({ eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo });
            //todo:↓  -----------------------------
            try {
                //どうるか
                // EventDateを更新するのではなくEventDateの同一eventIdを削除して選択日付で改めて登録
                // この際、EventUserSelからは既に登録されている日付を削除した場合は、同様に削除か
                // 本当にこんなことするのか。。
                // 更新
                //  Event
                //      eventName、eventMemo
                await eventUpdate({ eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo })
                // 削除
                //  EventDate
                //      条件：eventId
                //  EventUserSel
                //      条件：eventId、かつ、対象外eventDate
                eteventDates?.map(async (eventdate) => {
                    await trpc.useMutation(["EventDate_delete"]).mutate({ id: eventdate.id });
                })
                etEventUserSels?.filter((usrSel) => usrSel.eventDate)
                await trpc.useMutation(["EventUserSel_delete"]).mutate({ id: .id });
                // ２つの配列にあるオブジェクト内で定義した日付（Date型）で同じものだけを抽出したい。fileter,mapなどを使ってできないか

                eventDates?.map(async (eventdate) => {
                    // 作成
                    //  EventDate
                    //      eventDate    
                    //
                    //
                    //
                    //
                    // await eventdateUpdate({ id: 0, eventId: "", eventDate: eventdate.toISOString() });
                    // console.log("eventdateCreate= " + eventid + " eventdateCreate= " + eventdate.toISOString())
                })
            } catch (err) {
                console.log(err)
            }

            //todo:↑ -----------------------------
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
            {/* https://react-day-picker.js.org/ */}
            <Dialog >
                <DialogTrigger asChild>
                    <Button className="fixed-button mb-3" variant="default">イベント作成</Button>
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
                                <p>カレンダーで候補日を選択</p>
                                {/* https://react-day-picker.js.org/ */}
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
                            onClick={eventUpdateButtonClick}
                            disabled={isSubmitting}
                        >
                            イベント更新
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventUpdateDialog
