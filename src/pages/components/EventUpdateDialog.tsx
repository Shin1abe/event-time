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
            //todo:↓  -----------------------------
            try {
                // 日程を変更した場合
                // 削除:EventeDateは問答無用に全削除→全追加
                // 追加:EventeDateは問答無用に全削除→全追加
                // 更新 Event    eventName、eventMemo
                // DBデータ!=画面データの配列作成
                //-----------------------------------------------------

                if (!etEventUserSels || !eventDates) {
                    console.log("etEventUserSelsまたはeventDatesが定義されていません");
                    return;
                }
                const filterEventUserSels = function (XetEventUserSels: EventUserSel[], dateGetTime: number[]): EventUserSel[] {
                    return XetEventUserSels.filter(eventUserSel => {
                        // eventUserSel.eventDate が Date オブジェクトであることを確認
                        if (!(eventUserSel.eventDate instanceof Date)) {
                            console.error("eventUserSel.eventDate が Date オブジェクトではありません。");
                            return false;
                        }
                        // eventUserSel.eventDate の getTime() メソッドを安全に呼び出す
                        return dateGetTime.includes(eventUserSel.eventDate.getTime());
                    });
                };

                const etusDates = etEventUserSels.map(etus => {
                    const etusDate = new Date(etus.eventDate);
                    etusDate.setUTCHours(0, 0, 0, 0); // 時間をUTCの00:00:00にリセット
                    console.log(`etusDate: ${etusDate.toISOString()}`);
                    return etusDate.getTime();
                });

                const eventDatesUTC = eventDates.map(eventDate => {
                    const eventDateUTC = new Date(eventDate.getTime() - (eventDate.getTimezoneOffset() + 540) * 60000); // JSTからUTCに変換
                    eventDateUTC.setUTCHours(0, 0, 0, 0); // 時間をUTCの00:00:00にリセット
                    console.log(`eventDate: ${eventDateUTC.toISOString()}`);
                    return eventDateUTC.getTime();
                });

                const allDates = etusDates.concat(eventDatesUTC);
                const uniqueDates = allDates.filter((date, index) => allDates.indexOf(date) === index); // 重複を除去

                const DbChgDateNum = uniqueDates.filter(date =>
                    !etusDates.includes(date) || !eventDatesUTC.includes(date)
                );
                console.log("フィルタリング結果:", DbChgDateNum);
                DbChgDateNum.map(d => console.log((new Date(d)).toISOString()))


                // console.log("----------------------------------")
                // DbChgDateArray.forEach(dbChgDate => {
                //     // etEventUserSelsの各要素について処理を行う
                //     etEventUserSels.forEach(etEventUserSel => {
                //         // DbChgDateArrayの値をDateオブジェクトに変換
                //         const dbChgDateObj = new Date(dbChgDate);
                //         dbChgDateObj.setUTCHours(0, 0, 0, 0)
                //         // etEventUserSelsのeventDateをDateオブジェクトに変換
                //         const eventDateObj = new Date(etEventUserSel.eventDate);
                //         eventDateObj.setUTCHours(0, 0, 0, 0)
                //         console.log(">>>>>>")
                //         console.log("dbChgDateObj", dbChgDateObj.getTime(), dbChgDateObj.toISOString())
                //         console.log("etEventUserSel", eventDateObj.getTime(), eventDateObj.toISOString())
                //         // DbChgDateArrayの値とetEventUserSelsのeventDateが一致する場合
                //         if (dbChgDateObj.getTime() === eventDateObj.getTime()) {
                //             // その他の項目値とともに出力
                //             console.log("DbChgDate:", dbChgDate);
                //             console.log("id:", etEventUserSel.id);
                //             console.log("eventId:", etEventUserSel.eventId);
                //             console.log("eventDate:", etEventUserSel.eventDate);
                //             console.log("userId:", etEventUserSel.userId);
                //             console.log("userSel:", etEventUserSel.userSel);
                //             console.log("createdAt:", etEventUserSel.createdAt);
                //             console.log("---------------");
                //         }
                //     });
                // });
                // console.log("----------------------------------")
                // const dateGetTime:number= 
                // [
                //     1715385600000,
                //     1715817600000
                // ]

                // const XetEventUserSels:EventUserSel=[{
                //     id: 121,
                //     eventId: "clw92ughy0000356r4srrgtmd",
                //     eventDate: new Date("2024-05-11T15:00:00.000Z"),
                //     userId: 69,
                //     userSel: "〇",
                //     createdAt: new Date("2024-05-16T09:57:40.497Z")
                // },
                // {
                //     id: 121,
                //     eventId: "clw92ughy0000356r4srrgtmd",
                //     eventDate: new Date("2024-05-11T15:00:00.000Z"),
                //     userId: 69,
                //     userSel: "〇",
                //     createdAt: new Date("2024-05-16T09:57:40.497Z")
                // }]
                // XetEventUserSelsのeventDateとdateGetTimeのnew Date(値)が含まれるものだけをEventUserSelとして返却


                // DbChgDateArray.map(d => console.log((new Date(d)).toISOString()))
                //-----------------------------------------------------
                console.log("etEventUserSels")
                console.log(etEventUserSels)
                console.log("eventDates")
                console.log(eventDates)
                console.log("DbChgDateArray")
                console.log(DbChgDateArray)
                // ■
                // ■  Event ■
                // ■
                console.log("1")
                await eventUpdate({ eventId: eventid, eventName: eventName, eventUrl: etEvent?.eventUrl as string, eventMemo: eventMemo })
                // debugger

                // ■
                // ■  EventDate 
                // ■
                // 削除 EventDate   条件：eventId
                //      DB上の既存データを削除
                console.log("2")
                // console.log(eteventDates)
                eteventDates?.map(async (eventdate) => {
                    await EventDateDeleteMutation.mutate({ id: eventdate.id });
                })
                // debugger

                // 作成 EventDate   eventDate 
                //      画面上で選択された日付をすべて登録
                console.log("3")
                // console.log(eventDates)
                eventDates?.map(async (eventdate) => {
                    await eventdateCreate({ eventId: eventid, eventDate: eventdate.toISOString() });
                    // console.log("eventdateCreate=" + eventdate.toISOString())
                })

                //確認 debug
                // console.log(etEventUserSels)
                // console.log(eventDates)
                // const result = etEventUserSels?.filter(item => {
                //     const itemEventDate = new Date(item.eventDate);
                //     return eventDates?.some(eventDate => eventDate.getTime() === itemEventDate.getTime());
                // }) || [];
                // console.log("result")
                // console.log(result)

                // 日程を変更した場合
                // EventUserSelsでは、下記必要
                // ・変更してなくなった日付のレコードは削除
                // ・変更されなかった（既にある日付で変更がない）場合はそのまま残す
                // ■
                // ■  EventUserSels 
                // ■
                console.log("4")
                console.log("etEventUserSels")
                console.log(etEventUserSels)
                console.log("eventDates")
                console.log(eventDates)

                // DBデータ!=画面データをdbから削除
                DbChgDateArray?.map(async (d) => {
                    await EventUserSelDeleteMutation.mutate({ id: d.id });
                })

                // // // 今回変更がなかった配列作成（EventUserSelsに存在するもの）
                // const noChgDatesArray = etEventUserSels?.filter(etus => {
                //     const etusValue = new Date(etus.eventDate);
                //     return eventDates?.some(eventDate => eventDate.getTime() === etusValue.getTime());
                // }) || [];
                // console.log(eventDates)
                // console.log("noChgDatesArray")
                // console.log(noChgDatesArray)
                // console.log("noChgDatesArray.length = " + noChgDatesArray?.length)
                // // 今回追加した配列作成（EventUserSelsに存在するもの除外）

                // const chgDatesArray = eventDates?.filter(
                //     etd => {
                //         return !noChgDatesArray?.some(netus => {
                //             const netusValue = new Date(netus.eventDate);
                //             // console.log("s= " + netusValue.getTime());
                //             // console.log("e= " + etd.getTime());
                //             return netusValue.getTime() === etd.getTime();
                //         });
                //     }
                // ) || [];
                // console.log("chgDatesArray")
                // console.log(chgDatesArray)

                // console.log("chgDatesArray?.length= " + chgDatesArray?.length)
                //debugger
                // 今回変更がなかったレコードを作成（EventUserSelsに存在するもの）
                console.log("5")
                // DBデータ!=画面データをdbへ追加
                DbChgDateArray?.forEach(async (d) => {
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
            // router.push({
            //     pathname: '/components/AttendMng',
            //     query: { eventid: eventid },
            // });
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
