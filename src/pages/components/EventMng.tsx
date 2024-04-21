import React from 'react'
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

import { EventData, EventDateData, EventUserData, EventUserSelData } from "../../json/TableData";

const EventMng = () => {
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
  const clearButton = () => setDays(initialDays);
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  const footer =
    days && days.length > 0 ? (
      <div className='grid-cols-2 flex'>
        <div className='flex-3 text-left'>選択日数： {days.length} 日.</div>
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
        {EventData.map((eventdata, index) => (
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
                    selected={days}
                    onSelect={setDays}
                    footer={footer}
                  />
                </div>
                <Label htmlFor="eventName" className=' font-bold'>候補日</Label>
                <div className='flex  w-full ml-14 items-center'>
                  <ul>
                    {days?.map((day) => <li>・{day.toLocaleDateString()}[{["日", "月", "火", "水", "木", "金", "土"][day.getDay()]}]</li>)}
                  </ul>
                </div>
                <br />
                <Label htmlFor="eventName" className=' font-bold'>メモ</Label>
                <p>イベントの概要など参加者に連絡しておきたいことを記述することができます。</p>
                <Textarea className="w-full m-1" placeholder="例）旅行の日程を調整しましょう。締め切りは〇／〇です。" />
              </div>
            </DialogDescription>
            <DialogFooter>
              <Button type="submit"><Link href={"/components/AttendMng"}>イベント作成</Link></Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  )
}

export default EventMng
