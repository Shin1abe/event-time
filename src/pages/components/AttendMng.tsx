import React, { useState, useCallback } from 'react'
import Link from "next/link";
import { Button } from './ui/button'
import { Input } from './ui/input'
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

import { EventData, EventDateData, EventUserData, EventUserSelData } from "../../json/TableData";

const AttendMng = () => {
    const [eventId, setIventId] = useState(1);
    const [date, setDate] = useState<Date | undefined>(new Date())
    const handleClick = useCallback(() => {
        // const url = window.location.origin;
        const url = ((EventData.filter(ed => ed.eventId === ed.eventId)).map(e => e.eventUrl))[0]
        void (async () => {
            if (navigator.share) {
                // Web share API
                await navigator.share({
                    url,
                });
            } else {
                // Web Share APIが使えないブラウザの処理
                await navigator.clipboard.writeText(url);
                alert("URLをコピーしました");
            }
        })();
    }, []);

    // 日付を "MM/DD(曜日)" の形式で表示する関数
    function formatDateWithDayOfWeek(date: Date): string {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${month}/${day}\n(${dayOfWeek})`;
    }

    return (
        <div className="flex-wrap flex-row gap-1 m-2">
            <div className=' flex justify-between'>
                <div >
                    <Button type="submit" variant="ghost"><Link href={"/"}>{EventData.find(event => event.eventId === 1)?.eventName}</Link></Button>
                </div>
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger className='p-2'>メニュー</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>幹事メニュー</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Button variant="ghost">イベント編集</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button onClick={handleClick} variant="ghost">イベンＵＲＬをシェア</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost">イベント削除</Button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr className='m-3' />
            <h1 className='text-2xl+ font-bold'>{EventData.find(event => event.eventId === 1)?.eventName}</h1>
            <div className="flex flex-col justify-center gap-2">
                <p className='text-sm ml-3'>回答者{(EventUserData.filter((eud) => eud.eventId === eventId)).length}名</p>
                <p className='font-bold'>イベントメモ</p>
                <div>
                    <Table>
                        {/* <TableCaption>A list of attendees and their availability.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">参加者</TableHead>
                                {EventDateData.filter(event => event.eventId === eventId).map((date, index) => (
                                    <TableHead key={index} className='text-center'>
                                        {formatDateWithDayOfWeek(date.eventDate)}
                                    </TableHead>
                                ))}
                                <TableHead>コメント</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(EventUserData.filter(u => u.eventId === eventId)).map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <Button variant="secondary">{user.userName}</Button>
                                    </TableCell>
                                    {EventUserSelData.filter((esd) => esd.eventId === eventId && esd.userId === user.userId).map((user, idx) => (
                                        <TableCell key={idx} className='text-center'>{user.userSel}</TableCell>
                                    ))}
                                    <TableCell className='w-96'>{user.userMemo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <p>各自の出欠状況を変更するには名前を選択してください。</p>
                <p>項目が多い場合は右にスクロールすると続きが見られます。</p>
                <Button onClick={handleClick}>イベンＵＲＬをシェア</Button>
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
                                        <TableBody>
                                            {EventDateData.filter(event => event.eventId === eventId).map((data, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{formatDateWithDayOfWeek(data.eventDate)}</TableCell>
                                                    <TableCell className='text-center'><Badge>○</Badge></TableCell>
                                                    <TableCell className='text-center'>△</TableCell>
                                                    <TableCell className='text-center'>×</TableCell>
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
                            <Button type="submit"><Link href={"/components/EventMng"}>出欠を登録する</Link></Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default AttendMng
