import React from 'react'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

const EventMng = () => {
  return (
    <div className="flex-wrap flex-row gap-1 m-2">
      <h1 className='m-1 text-2xl font-bold'>ようこそゲストさん</h1>
      <hr />
      <h1 className='m-1 text-2xl+'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
            <CardDescription>メモ</CardDescription>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
            <CardDescription>メモ</CardDescription>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
            <CardDescription>メモ</CardDescription>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
            <CardDescription>メモ</CardDescription>
          </CardHeader>
          <CardContent>
            <p>2023/05/12 19:00～,2023/05/19 19:00～</p>
          </CardContent>
        </Card>
        <Card className='m-3'>
          <CardHeader>
            <CardTitle><Badge>幹事</Badge><p className='m-1'>お別れ会</p></CardTitle>
            <CardDescription>メモ</CardDescription>
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
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-auto">
              <Label htmlFor="eventName" >イベント名</Label>
              <Badge className='ml-1'>必須</Badge>
              <Input
                id="eventName"
                defaultValue="イベント名を入力してください"
                className="col-span-3"
              />
              <Label htmlFor="username" >日程候補</Label>
              <Badge className='ml-1'>必須</Badge>
              <Calendar mode="single" className="rounded-md border-4" />
              <Textarea className="w-full" placeholder="2024/5/12 19:00～、2024/5/17～" />
              <Label htmlFor="eventName">メモ</Label>
              {/* <dl>イベントの概要など参加者に連絡しておきたいことを記述することができます。</dl> */}
              <Textarea className="w-full" placeholder="例）飲み会の日程を調整しましょう。締め切りは〇／〇です。" />
            </div>
            <DialogFooter>
              <Button type="submit">イベント作成</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  )
}

export default EventMng
