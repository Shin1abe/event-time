import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import { trpc } from "@/utils/trpc";
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
import {
    Event,
    EventDate,
    EventUser,
    EventUserSel
} from "@prisma/client";

const AttendMng = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;

    //■  useState
    const [eventId, setEventId] = useState<string>();
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [userId, setUserId] = useState<number>();
    const [userName, setUserName] = useState<string>("");
    const [userMemo, setUserMemo] = useState<string>("")

    //■  trcp
    const eventIdtmp: string = eventid ?? "";
    const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    const deleteMutation = trpc.useMutation(["Event_delete"]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: (data) => {
            setUserId(data?.userId)
        }
    });
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"], {
        onSuccess: () => eventUserSelRefetch(),
    });

    //■  event
    // 対象イベントの削除
    const eventDelete = async (eventId: string) => {
        await deleteMutation.mutate({ eventId });
        // 削除成功後の処理
    };

    const onClickEventshare = useCallback(() => {
        const url: string = event?.[0] ? event?.[0]?.eventUrl : ""
        void (async () => {
            if (navigator.share) {
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

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const onChangeUserMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMemo(e.target.value);
    };
    // イベント作成ボタン押下
    const onClickAtendCreate = async () => {
        console.log(eventIdtmp)
        console.log(userName)
        console.log(userMemo)

        await EventUserCreateMutation.mutate({
            eventId: eventIdtmp,
            userName: userName,
            userMemo: userMemo,
        });

        eventDate?.map(async (d) => {
            await EventUserSelCreateMutation.mutate({
                eventId: eventIdtmp,
                eventDate: d.eventDate ? new Date(d.eventDate).toISOString() : "",
                userId: userId ? userId : 0,
                userSel: "〇",
            });
        })
        // const url: string = event?.[0] ? event?.[0]?.eventUrl : "";
        // router.push(url)
        location.reload();
    }

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
            <div className='flex justify-between'>
                <div >
                    <Button >
                        {
                            event?.[0] ? (
                                <Link href="/">
                                    <a>戻る</a>
                                </Link>
                            ) : null
                        }
                    </Button>
                </div>
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger className='p-1'>幹事メニュー</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>幹事メニュー</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Button variant="ghost">イベント編集</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button onClick={onClickEventshare} variant="ghost">イベンＵＲＬをシェア</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost">イベント削除</Button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr className='m-3' />
            {/* ■■■■■■■■■　出席者一覧　■■■■■■■■■ */}
            <h1 className='font-bold'>{event?.[0]?.eventName}</h1>
            <div className="flex flex-col justify-center gap-2">
                <p className=' text-base ml-3'>回答者：{eventUser?.length}名</p>
                <h1 className='font-bold'>イベントメモ</h1>
                <div>
                    <Table>
                        {/* <TableCaption>A list of attendees and their availability.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-96 ">参加者</TableHead>
                                {
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
                                <TableRow key={index}>
                                    <TableCell className="font-medium p-0">
                                        <Button className="p-0 ml-5" variant="secondary">{user.userName}</Button>
                                    </TableCell>
                                    {eventUserSel?.map((user, idx) => (
                                        <TableCell key={idx} className='text-center p-0'>
                                            <div className="p-0" >{user.userSel}</div>
                                        </TableCell>
                                    ))}
                                    <TableCell className='w-96 p-0'>{user.userMemo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <p>各自の出欠状況を変更するには名前を選択してください。</p>
                <p>項目が多い場合は右にスクロールすると続きが見られます。</p>
                <Button onClick={onClickEventshare}>イベンＵＲＬをシェア</Button>
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
                                <Label htmlFor="eventName" className='text-base font-bold' >名前</Label>
                                <Badge className='ml-1 p-0.5'>必須</Badge>
                                <Input
                                    id="eventName"
                                    defaultValue="名前を入力してください"
                                    className="col-span-3 m-1"
                                    onChange={onChangeUserName}
                                    value={userName}
                                />
                                <br />
                                <Label htmlFor="username" className='text-base font-bold' >日程候補</Label>
                                <Badge className='ml-1 p-0.5'>必須</Badge>
                                <div>
                                    <Table>
                                        <TableBody>
                                            {eventDate?.map((data, index) => (
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
                                <Textarea
                                    className="w-full m-1"
                                    placeholder="是非参加します。"
                                    onChange={onChangeUserMemo}
                                    value={userMemo}
                                />
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <Button onClick={onClickAtendCreate}>
                                出欠を登録する
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default AttendMng
