import React from 'react'
import Link from "next/link";
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

const EventMng = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
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
                <Input
                  id="eventName"
                  defaultValue="イベント名を入力してください"
                  className="col-span-3 m-1"
                />
                <br />
                <Label htmlFor="username" className=' font-bold' >日程候補</Label>
                <Badge className='ml-1'>必須</Badge>
                <p>①カレンダーで候補日を選択</p>
                <p>②入力欄に反映された時間を編集</p>
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="flex justify-center rounded-md border w-full"
                  />
                  <Textarea className="w-full m-1" placeholder="2024/5/12 19:00～,2024/5/17～" />
                </div>
                <br />
                <Label htmlFor="eventName" className=' font-bold'>メモ</Label>
                <p>イベントの概要など参加者に連絡しておきたいことを記述することができます。</p>
                <Textarea className="w-full m-1" placeholder="例）飲み会の日程を調整しましょう。締め切りは〇／〇です。" />
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
