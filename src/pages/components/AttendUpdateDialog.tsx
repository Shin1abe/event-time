import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Label } from '../../ui/label'
import { Table, TableBody, TableCell, TableRow } from "@/ui/table"
// import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDiamond, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/ui/input';

// selections の型定義
interface Selections {
    [key: string]: '○' | '◇' | '×';
}

const AttendUpdateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid, userid } = router.query;
    const eventIdtmp: string = eventid as string;
    const userIdtmp: number = parseFloat(userid as string);

    //■  trcp  Query
    const { data: eventUser, refetch: eventUserRefetch } =
        trpc.useQuery(["EventUser_findUnique", { userId: userIdtmp }]);
    // console.log("EventUser_findUnique.eventUser", eventUser)
    const { data: eventUserSel, refetch: eventUserSelRefetch } =
        trpc.useQuery(["EventUserSel_findWhereManyForUserId", { userId: userIdtmp }]);
    // console.log("EventUserSel_findWhereManyForUserId.eventUserSel", eventUserSel)

    //■  trcp  mutation
    const EventUserSelUpdateMutation = trpc.useMutation(["EventUserSel_update"], {
        onSuccess: () => eventUserSelRefetch(),
    });
    const EventUserUpdateMutation = trpc.useMutation(["EventUser_update"], {
        onSuccess: async () => {
            await eventUserRefetch();
            setIsEeventUserRftch(true);
        },
    });

    //■  useState
    const [userName, setUserName] = useState<string>(() => eventUser?.userName || '');
    const [userMemo, setUserMemo] = useState<string>(() => eventUser?.userMemo || '');
    const [isEeventUserRftch, setIsEeventUserRftch] = useState<boolean>(false);
    const [selections, setSelections] = useState<Selections>(() => {
        const initialSelections: Selections = {};
        eventUserSel?.forEach(sel => {
            initialSelections[new Date(sel.eventDate).toISOString()] = sel.userSel as '○' | '◇' | '×';
        });
        return initialSelections;
    });
    useEffect(() => {
        console.log("useEffect.eventUser", eventUser)
        console.log("useEffect.eventUserSel", eventUserSel)
        setUserName(eventUser?.userName || '');
        setUserMemo(eventUser?.userMemo || '');
        if (eventUser && eventUserSel) {
            const initialSelections: Selections = {};
            eventUserSel.forEach(sel => {
                initialSelections[new Date(sel.eventDate).toISOString()] = sel.userSel as '○' | '◇' | '×';
            });
            setSelections(initialSelections);
            console.log("useEffect.initialSelections", initialSelections)
        }
    }, [eventUser, eventUserSel]);

    //■  event
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const onChangeUserMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMemo(e.target.value);
    };

    const handleSelection = (date: string, selection: '○' | '◇' | '×') => {
        setSelections((prev) => ({
            ...prev,
            [date]: selection,
        }));
        console.log("selections", selections);
    };


    //■  util
    const getClassName = (date: string, selection: '○' | '◇' | '×', baseClass: string, selectedClass: string) => {
        return selections[date] === selection ? selectedClass : baseClass;
    };

    // イベント作成ボタン押下
    // reactの再レンダリングで相当苦労
    const onClickAtendUpdate = useCallback(async () => {
        console.log("onClickAtendCreate_userName", userName)
        if (userName.length === 0) { alert("名前が設定されていません"); return }//TODO TOAST
        if (eventIdtmp.length === 0) { alert("eventIdが設定されていません"); return }//TODO TOAST
        await EventUserUpdateMutation.mutate({
            userId: userIdtmp,
            userName: userName,
            userMemo: userMemo,
        });
    }, [userName, userMemo]);

    // reactの再レンダリングで相当苦労
    useEffect(() => {
        if (eventUserSel && isEeventUserRftch) {
            eventUserSel.forEach(async (d) => {
                console.log("eventDate= " + d.eventDate);
                await EventUserSelUpdateMutation.mutate({
                    id: d.id,
                    userSel: selections[new Date(d.eventDate).toISOString()],
                });
            });
            // location.reload();
            router.push({
                pathname: '/components/AttendMng',
                query: { eventid: eventIdtmp },
            }).then(() => {
                router.reload();
            });
        }
    }, [isEeventUserRftch, eventUserSel]);

    return (
        // {/* ■■■■■■■■■出席入力ダイアログ■■■■■■■■■ */}
        <div >
            <Dialog defaultOpen={true}>
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
                                type='text'
                                id="userName"
                                className="col-span-3 m-1"
                                onChange={onChangeUserName}
                                value={userName} />
                            <br />
                            <Label htmlFor="username" className='text-base font-bold' >日程候補</Label>
                            <Badge className='ml-1 p-0.5'>必須</Badge>
                            <div>
                                <Table>
                                    <TableBody>
                                        {eventUserSel?.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{formatDateWithDayOfWeek0sup(data.eventDate)}</TableCell>
                                                <TableCell className='text-center'>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '○',
                                                            'text-slate-200', 'text-slate-600')}`}
                                                        style={{ width: '16px', height: '16px' }}
                                                        onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '○')}
                                                    />
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    <FontAwesomeIcon
                                                        icon={faDiamond}
                                                        className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '◇',
                                                            'text-slate-200', 'text-slate-600')}`}
                                                        style={{ width: '16px', height: '16px' }}
                                                        onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '◇')}
                                                    />
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '×',
                                                            'text-slate-200', 'text-slate-600')}`}
                                                        style={{ width: '16px', height: '16px' }}
                                                        onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '×')}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <br />
                            <Label htmlFor="eventName" className=' font-bold'>コメント</Label>
                            <textarea
                                cols={50}
                                className="w-full m-1"
                                placeholder="是非参加します。"
                                onChange={onChangeUserMemo}
                                rows={3}
                                value={userMemo} />
                        </div>
                    </DialogDescription>

                    <DialogFooter>
                        <Button onClick={onClickAtendUpdate}>出欠を更新する</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AttendUpdateDialog