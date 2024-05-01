import React, { useState, useCallback } from 'react'
import { useParams } from "react-router-dom";
import { useRouter } from 'next/router';
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
import { trpc } from "@/utils/trpc";
import {
    Event,
    EventDate,
    EventUser,
    EventUserSel
} from "@prisma/client";
import { EventData, EventDateData, EventUserData, EventUserSelData } from "../../json/TableData";

const AttendMng = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    console.log("AttendMng.eventId= " + eventid)

    //■  useState
    const [eventId, setEventId] = useState(eventid);
    const [date, setDate] = useState<Date | undefined>(new Date())

    //■  trcp
    // const { data: etEvent, refetch } = trpc.useQuery(["Event_findMany"]);
    const eventIdtmp: string = eventid ?? "";
    const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    console.log(event)
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    console.log(eventDate)
    const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    console.log(eventUser)
    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);
    console.log(eventUserSel)

    const deleteMutation = trpc.useMutation(["Event_delete"]);

    //■  event
    // 対象イベントの削除
    const eventDelete = async (eventId: string) => {
        await deleteMutation.mutate({ eventId });
        // 削除成功後の処理
    };
    // <button onClick={() => handleDelete(123)}>削除</button>  

    const handleClick = useCallback(() => {
        // const url = window.location.origin;
        // const url = ((EventData.filter(ed => ed.eventId === ed.eventId)).map(e => e.eventUrl))[0]
        const url: string = event?.[0]?.eventUrl
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
    }, []); // コロンをここに追加

    //■  util
    // 日付を "MM/DD(曜日)" の形式で表示する関数
    function formatDateWithDayOfWeek(date: Date): string {
        if (date !== null) {
            const newDate = new Date(date)
            const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
            const day = newDate.getDate().toString().padStart(2, '0');
            const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
            const dayOfWeek = daysOfWeek[newDate.getDay()];
            return `${month}/${day}\n(${dayOfWeek})`;
        } else {
            return "No date available"
        }
    }

    return (
        // ■■■■■■■■■　ヘッド・メニュー　■■■■■■■■■
        <div className="flex-wrap flex-row gap-1 m-2">
            <div className=' flex justify-between'>
                <div >
                    <Button type="submit" variant="ghost">
                        {
                            event?.[0] ? (
                                <Link href="/">
                                    <a>{event[0].eventName}</a>
                                </Link>
                            ) : null
                        }
                        {/* <Link href={"/"}>{
                            event?.[0]?.eventName
                            // EventData.find(event => event.eventId === "1")?.eventName
                        }</Link> */}
                    </Button>
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
            {/* ■■■■■■■■■　出席者一覧　■■■■■■■■■ */}
            <h1 className='text-2xl+ font-bold'>{event?.[0]?.eventName}</h1>
            <div className="flex flex-col justify-center gap-2">
                <p className='text-sm ml-3'>回答者{eventUser?.length}名</p>
                {/* <p className='text-sm ml-3'>回答者{(EventUserData.filter((eud) => eud.eventId === eventId)).length}名</p> */}
                <p className='font-bold'>イベントメモ</p>
                <div>
                    <Table>
                        {/* <TableCaption>A list of attendees and their availability.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">参加者</TableHead>
                                {
                                    // EventDateData.filter(event => event.eventId === eventId).map((date, index) => (
                                    eventDate?.map((date, index) => (
                                        <TableHead key={index} className='text-center'>
                                            {formatDateWithDayOfWeek(date.eventDate)}
                                        </TableHead>
                                    ))}
                                <TableHead>コメント</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventUser?.map((user, index) => (
                                // {(EventUserData.filter(u => u.eventId === eventId)).map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <Button variant="secondary">{user.userName}</Button>
                                    </TableCell>
                                    {eventUserSel?.map((user, idx) => (
                                        // {EventUserSelData.filter((esd) => esd.eventId === eventId && esd.userId === user.userId).map((user, idx) => (
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
            {/* ■■■■■■■■■　出席入力ダイアログ　■■■■■■■■■ */}
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
                                            {eventDate?.map((data, index) => (
                                                // {EventDateData.filter(event => event.eventId === eventId).map((data, index) => (
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
                            <Button type="submit">
                                <Link href={"/components/EventMng"}>出欠を登録する</Link>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default AttendMng
