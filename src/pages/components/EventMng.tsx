import React from 'react'
import Link from "next/link";
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

const EventMng = () => {
  // const [date, setDate] = React.useState<Date | undefined>(new Date())
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  const clearButton = () => setDays(initialDays);
  const footer =
    days && days.length > 0 ? (
      <div className='grid-cols-2 flex'>
        <div className='flex-3 text-left'>You selected {days.length} day(s).</div>
        <div className='flex-1 text-right'><Button variant="outline" onClick={clearButton}>clear</Button></div></div>
    ) : (
      <p>Please pick one or more days.</p>
    );

  return (
    <div className="flex-wrap flex-row gap-1 m-2">
      <h1 className='m-1 text-2xl font-bold'>ようこそゲストさん</h1>
      <hr />
      <h1 className='m-1 text-2xl+'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
      </div>
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
                {/* <Input
                  id="eventName"
                  defaultValue="イベント名を入力してください"
                  className="m-1"
                /> */}
                <br />
                <Label htmlFor="username" className=' font-bold' >日程候補</Label>
                <Badge className='ml-1'>必須</Badge>
                <p>カレンダーで候補日を選択</p>
                {/* https://react-day-picker.js.org/ */}
                <DayPicker
                  mode="multiple"
                  min={0}
                  selected={days}
                  onSelect={setDays}
                  footer={footer}
                />
                <ul>
                  {days?.map((day) => <li>{day.toLocaleDateString()}</li>)}
                </ul>
                {/* <div className='grid-cols-2 flex'>
                  <div className='flex-2'>
                    <DayPicker
                      mode="multiple"
                      min={0}
                      selected={days}
                      onSelect={setDays}
                      footer={footer}
                    />
                  </div>
                  <div className='flex-1 mt-20 ml-2'>
                    <ol>
                      {days?.map((day) => <li>{day.toLocaleDateString()}</li>)}
                    </ol>
                  </div>
                </div> */}
                <br />
                <Label htmlFor="eventName" className=' font-bold'>メモ</Label>
                <p>イベントの概要など参加者に連絡しておきたいことを記述することができます。</p>
                {/* <Textarea className="w-full m-1" placeholder="例）飲み会の日程を調整しましょう。締め切りは〇／〇です。" /> */}
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
