import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/pages/components/ui/table"
import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';

const AttendCreateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;

    //■  useState
    const [userId, setUserId] = useState<number>();
    const [userName, setUserName] = useState<string>("");
    const [userMemo, setUserMemo] = useState<string>("")

    //■  trcp
    const eventIdtmp: string = eventid ?? "";
    // const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    // const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    // const deleteMutation = trpc.useMutation(["Event_delete"]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: (data) => {
            setUserId(data?.userId)
        }
    });
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"], {
        onSuccess: () => eventUserSelRefetch(),
    });

    //■  event
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

    return (
        // {/* ■■■■■■■■■　出席入力ダイアログ　■■■■■■■■■ */}
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
                                                <TableCell>{formatDateWithDayOfWeek0sup(data.eventDate)}</TableCell>
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
                        <Button onClick={onClickAtendCreate}>出欠を登録する</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AttendCreateDialog
