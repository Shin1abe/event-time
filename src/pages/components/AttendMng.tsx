import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from './ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/pages/components/ui/table"
import AttendCreateDialog from './AttendCreateDialog';
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';
import HeaderCoordinator from './HeaderCoordinator';
import { useEtContext } from '../providers/EtProvider';

const AttendMng = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;

    //■  useEtContext
    const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()

    //■  trcp
    let eventIdtmp: string = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }
    const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

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

    return (
        <div className="flex-wrap flex-row gap-1 m-2">
            {/* ■■■■■■■■■　ヘッド・メニュー　■■■■■■■■■ */}
            {isCoordinator ? (<HeaderCoordinator />) : null}
            {/* ■■■■■■■■■　出席者一覧　■■■■■■■■■ */}
            <div>
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
                                                {formatDateWithDayOfWeek0sup(date.eventDate)}
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
            </div>
            {/* ■■■■■■■■■　出席入力ダイアログ　■■■■■■■■■ */}
            <div >
                <AttendCreateDialog />
            </div>
        </div >
    )
}

export default AttendMng