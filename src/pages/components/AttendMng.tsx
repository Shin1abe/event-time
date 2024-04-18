import React from 'react'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/pages/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/pages/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/pages/components/ui/toggle-group"
import Link from "next/link";


const scheduleData = [
    { date: '4/13(土) 19:00', slot1: '○', slot2: '△', slot3: '×' },
    { date: '4/20(土) 19:00', slot1: '○', slot2: '△', slot3: '×' },
    { date: '4/27(土) 19:00', slot1: '○', slot2: '△', slot3: '×' }
]

const AttendMng = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="flex-wrap flex-row gap-1 m-2">
            <div className=' flex justify-between'>
                <div >
                    <Button type="submit"><Link href={"/"}>歓送迎会</Link></Button>
                </div>
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger className='p-2'>メニュー</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>幹事メニュー</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>イベント編集</DropdownMenuItem>
                            <DropdownMenuItem>イベントをシェア</DropdownMenuItem>
                            <DropdownMenuItem>イベント削除</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr />


            <h1 className='m-1 text-2xl+'>歓送迎会</h1>
            <div className="flex flex-col justify-center gap-2">
                <p>回答者0名</p>
                <p>イベントメモ</p>
                <div>
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">参加者</TableHead>
                                <TableHead className='text-center'>4/20<br />土</TableHead>
                                <TableHead className='text-center'>4/27<br />土</TableHead>
                                <TableHead className='text-center'>5/2<br />土</TableHead>
                                <TableHead className='text-center'>5/10<br />土</TableHead>
                                <TableHead className='text-center'>5/17<br />土</TableHead>
                                <TableHead >コメント</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium"><Button>安部</Button></TableCell>
                                <TableCell className='text-center'>○</TableCell>
                                <TableCell className='text-center'>○</TableCell>
                                <TableCell className='text-center'>○</TableCell>
                                <TableCell className='text-center'>○</TableCell>
                                <TableCell className='text-center'>○</TableCell>
                                <TableCell >是非参加します。</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium"><Button>坂井</Button></TableCell>
                                <TableCell className='text-center'>×</TableCell>
                                <TableCell className='text-center'>×</TableCell>
                                <TableCell className='text-center'>×</TableCell>
                                <TableCell className='text-center'>×</TableCell>
                                <TableCell className='text-center'>×</TableCell>
                                <TableCell >今回は不参加</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
                <p>各自の出欠状況を変更するには名前を選択してください。</p>
                <p>項目が多い場合は右にスクロールすると続きが見られます。</p>
                <Button>イベントをシェア</Button>
            </div>
            <div >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="fixed-button mb-3" variant="default">出欠を入力する</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>出欠表入力</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <div className="flex-auto">
                                <Label htmlFor="eventName" className=' font-bold' >名前</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <Input
                                    id="eventName"
                                    defaultValue="名前を入力してください"
                                    className="col-span-3 m-1"
                                />
                                <br />
                                <Label htmlFor="username" className=' font-bold' >日程候補</Label>
                                <Badge className='ml-1'>必須</Badge>
                                <div>
                                    <Table>
                                        {/* <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead className='text-center'>Slot 1</TableHead>
                                                <TableHead className='text-center'>Slot 2</TableHead>
                                                <TableHead className='text-center'>Slot 3</TableHead>
                                            </TableRow>
                                        </TableHeader> */}
                                        <TableBody>
                                            {scheduleData.map((schedule, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{schedule.date}</TableCell>
                                                    <TableCell className='text-center'><Badge>{schedule.slot1}</Badge></TableCell>
                                                    <TableCell className='text-center'>{schedule.slot2}</TableCell>
                                                    <TableCell className='text-center'>{schedule.slot3}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <br />
                                <Label htmlFor="eventName" className=' font-bold'>コメント</Label>
                                <Textarea className="w-full m-1" placeholder="是非参加します。" />
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <Button type="submit"><Link href={"/components/EventMng"}>イベント作成</Link></Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default AttendMng
