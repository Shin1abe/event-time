import React, { useState } from 'react'
import Link from "next/link";
import { Button } from './ui/button'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import cuid from 'cuid';

import { EventData, EventDateData, EventUserData, EventUserSelData } from "../../json/TableData";

import { trpc } from "@/utils/trpc";
import { Event } from "@prisma/client";
import { EventDate } from "@prisma/client";

import { useRouter } from 'next/router';

const EventMng = () => {
  const [eventName, setEventName] = useState<string>("");
  const [eventUrl, setEventUrl] = useState<string>("https://react-day-picker.js.org");;
  const [eventMemo, setEventMemo] = useState<string>("");;

  const initialDays: Date[] = [];
  const clearButton = () => setEventsDates(initialDays);
  const [eventDates, setEventsDates] = useState<Date[] | undefined>(initialDays);

  // イベント一覧取得
  const { data: etEvent, refetch } = trpc.useQuery(["Event_findMany"]);

  // インベントの追加
  const eventCreateMutation = trpc.useMutation(["Event_create"]);
  const eventCreate = async (newEvent: {
    eventId: string;
    eventName: string;
    eventUrl: string;
    eventMemo: string;
  }) => {
    await eventCreateMutation.mutate(newEvent);
    // 作成成功後の処理
  };

  // 日付の追加
  const eventdateCreateMutation = trpc.useMutation(["EventDate_create"]);
  const eventdateCreate = async (newEvent: {
    eventId: string;
    eventDate: Date;
  }) => {
    await eventdateCreateMutation.mutate(newEvent);
    // 作成成功後の処理
  };


  //例：<button onClick={() => eventCreate({ eventName: "イベント名", eventUrl: "https://example.com" })}>
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleButtonClick = async () => {
    setIsSubmitting(true);
    // ここで別メソッドを呼び出す
    const eventid = cuid();
    eventCreate({ eventId: eventid, eventName: eventName, eventUrl: eventUrl, eventMemo: eventMemo })
    eventDates?.map((eventdate) => eventdateCreate({ eventId: eventid, eventDate: eventdate }))
    console.log(eventDates)
    // ローカルにも保存
    // 別メソッドの実行後に遷移

    router.push("/components/AttendMng/");
  };


  // 初期画面（幹事）
  // 日付を "MM/DD(曜日)" の形式で表示する関数
  function formatDateWithDayOfWeek(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${month}/${day}(${dayOfWeek})`;
  }

  //イベント作成ダイアログ　
  // const clearButton = () => setDays(initialDays);
  // const initialDays: Date[] = [];
  // const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
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
    // 初期画面（幹事）
    <div className="flex-wrap flex-row gap-1 m-2">
      <h1 className='m-1 text-2xl font-bold'>ようこそゲストさん</h1>
      <hr />
      <h1 className='m-1 text-2xl+'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        {etEvent?.map((eventdata: Event, index: number) => (
          <Card className='m-3' key={index}>
            <CardHeader>
              <CardTitle ><Badge className='mb-2'>幹事</Badge><p className='m-1'>{eventdata.eventName}</p></CardTitle>
            </CardHeader>
            <CardContent>
              <p className='ml-3'>
                {EventDateData.filter((edd) => edd.eventId === eventdata.eventId)
                  .map((edd, index) => (
                    <React.Fragment key={index}>
                      {formatDateWithDayOfWeek(edd.eventDate)}
                      {index !== (EventDateData.filter((edd) => edd.eventId === eventdata.eventId)).length - 1 && ', '}
                    </React.Fragment>
                  ))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* イベント作成ダイアログ */}
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
              <div className="flex-auto">
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
                <div className='preview flex min-h-[250px] w-full justify-center p-1 items-center border border-gray-300 rounded-md'>
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
                <div className='flex  w-full ml-14 items-center'>
                  <ul>
                    {eventDates?.map((day) => <li>・{day.toLocaleDateString()}[{["日", "月", "火", "水", "木", "金", "土"][day.getDay()]}]</li>)}
                  </ul>
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
            </DialogDescription>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleButtonClick}
                disabled={isSubmitting}
              >
                イベント作成
              </Button>
              {/* <Button type="submit">
                <Link href={"/components/AttendMng"}>イベント作成</Link>
              </Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  )
}

export default EventMng
