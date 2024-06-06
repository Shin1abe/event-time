import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Label } from '../../ui/label'
import { Table, TableBody, TableCell, TableRow } from "@/ui/table"
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDiamond, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/ui/input';

// selections の型定義
interface Selections {
    [key: string]: '○' | '◇' | '×';
}

const AttendCreateDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    const eventIdtmp: string = eventid as string;

    //■  useState
    const [userName, setUserName] = useState<string>("");
    const [userMemo, setUserMemo] = useState<string>("");
    const [isEeventUserRftch, setIsEeventUserRftch] = useState<boolean>(false);
    const [selections, setSelections] = useState<Selections>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //■  trcp  
    const { data: eventDate } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);

    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"], {
        onSuccess: () => eventUserSelRefetch(),
    });

    const { data: eventUsers, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: async () => {
            await eventUserRefetch();
            setIsEeventUserRftch(true);
        },
    });

    //■  event
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        setError(null);
    };
    const onChangeUserMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMemo(e.target.value);
    };

    const handleSelection = (date: string, selection: '○' | '◇' | '×') => {
        setSelections((prev) => ({
            ...prev,
            [date]: selection,
        }));
        setError(null);
    };

    //■  util
    const getClassName = (date: string, selection: '○' | '◇' | '×', baseClass: string, selectedClass: string) => {
        return selections[date] === selection ? selectedClass : baseClass;
    };

    // イベント作成ボタン押下
    const onClickAtendCreate = useCallback(async () => {
        if (!userName) { setError("名前を設定してください"); return; }
        if (eventDate && Object.keys(selections).length < eventDate.length) {
            setError("日程候補を設定してください"); return;
        }
        setIsSubmitting(true);
        try {
            const newUser = await EventUserCreateMutation.mutateAsync({
                eventId: eventIdtmp,
                userName,
                userMemo,
            });

            if (newUser && eventDate) {
                await Promise.all(eventDate.map(d =>
                    EventUserSelCreateMutation.mutateAsync({
                        eventId: eventIdtmp,
                        eventDate: d.eventDate ? new Date(d.eventDate).toISOString() : "",
                        userId: newUser.userId as number,
                        userSel: selections[new Date(d.eventDate).toISOString()],
                    })
                ));
            }
            setIsSubmitting(false);
            router.reload();
        } catch (error) {
            setError("エラーが発生しました。再度お試しください。");
            setIsSubmitting(false);
        }
    }, [userName, eventDate, selections, router, eventIdtmp, EventUserCreateMutation, EventUserSelCreateMutation]);

    return (
        // {/* ■■■■■■■■■出席入力ダイアログ■■■■■■■■■ */}
        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed-button mb-3  bg-blue-500 text-blue-200" variant="default">出欠を入力する</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-700">
                <DialogHeader>
                    <DialogTitle>出欠表入力</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {error && <div className="text-red-600">{error}</div>}
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
                        <Table>
                            <TableBody>
                                {eventDate?.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatDateWithDayOfWeek0sup(data.eventDate)}</TableCell>
                                        <TableCell className='text-center'>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '○',
                                                    'text-slate-500', 'text-orange-500')}`}
                                                style={{ width: '24px', height: '24px' }}
                                                onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '○')}
                                            />
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <FontAwesomeIcon
                                                icon={faDiamond}
                                                className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '◇',
                                                    'text-slate-500', 'text-gray-300')}`}
                                                style={{ width: '24px', height: '24px' }}
                                                onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '◇')}
                                            />
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className={`cursor-pointer ${getClassName(new Date(data.eventDate).toISOString(), '×',
                                                    'text-slate-500', 'text-yellow-100')}`}
                                                style={{ width: '24px', height: '24px' }}
                                                onClick={() => handleSelection(new Date(data.eventDate).toISOString(), '×')}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <br />
                        <Label htmlFor="eventName" className=' font-bold'>コメント</Label>
                        <textarea
                            cols={50}
                            className="w-full m-1"
                            // placeholder="コメントを記入してください。"
                            onChange={onChangeUserMemo}
                            rows={3}
                            value={userMemo} />
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <Button
                        className=' bg-blue-500 text-blue-200'
                        onClick={onClickAtendCreate}
                        disabled={isSubmitting}>
                        {isSubmitting ? '送信中...' : '出欠を登録する'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AttendCreateDialog
