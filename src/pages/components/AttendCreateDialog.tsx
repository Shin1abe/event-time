import React, { useState, useCallback, useEffect } from 'react'
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
    const eventIdtmp: string = eventid as string;

    //■  useState
    const [userName, setUserName] = useState<string>("");
    const [userMemo, setUserMemo] = useState<string>("");
    const [isEeventUserRftch, setIsEeventUserRftch] = useState<boolean>(false);

    //■  trcp  
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);

    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"], {
        onSuccess: () => eventUserSelRefetch(),
    });

    const { data: eventUsers, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findMany"]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: async () => {
            await eventUserRefetch();
            setIsEeventUserRftch(true);
            // console.log("EventUserCreateMutation.eventUserRefetch")
        },
    });

    //■  event
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        console.log("onChangeUserName:" + userName)
    };
    const onChangeUserMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMemo(e.target.value);
    };

    // イベント作成ボタン押下
    // reactの再レンダリングで相当苦労
    const onClickAtendCreate = useCallback(async () => {
        // console.log("onClickAtendCreate.isEeventUserRftch= " + isEeventUserRftch)
        // console.log("onClickAtendCreate.userName= " + userName)
        if (userName.length === 0) { alert("名前が設定されていません"); return }//TODO TOAST
        if (eventIdtmp.length === 0) { alert("eventIdが設定されていません"); return }//TODO TOAST
        await EventUserCreateMutation.mutate({
            eventId: eventIdtmp,
            userName: userName,
            userMemo: userMemo,
        });
    }, [userName, userMemo]);

    // reactの再レンダリングで相当苦労
    useEffect(() => {
        // console.log("useEffect.isEeventUserRftch= " + isEeventUserRftch)
        // console.log("useEffect.eventUsers= " + eventUsers)
        // console.log("useEffect.eventDate= " + eventDate)
        if (eventUsers && eventDate && isEeventUserRftch) {
            eventUsers.forEach(euss => {
                console.log("userId= " + euss.userId);
                eventDate.forEach(async (d) => {
                    console.log("eventDate= " + d.eventDate);
                    await EventUserSelCreateMutation.mutate({
                        eventId: eventIdtmp,
                        eventDate: d.eventDate ? new Date(d.eventDate).toISOString() : "",
                        userId: euss.userId as number,
                        userSel: "〇",
                    });
                });
            });
            location.reload();
        }
    }, [isEeventUserRftch, eventUsers, eventDate]);

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
                            <Label htmlFor="userName" className='text-base font-bold' >名前</Label>
                            <Badge className='ml-1 p-0.5'>必須</Badge>
                            <Input
                                id="userName"
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
