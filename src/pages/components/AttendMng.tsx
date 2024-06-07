import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from '../../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import AttendCreateDialog from './AttendCreateDialog';
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';
import HeaderCoordinator from './HeaderCoordinator';
import { useEtContext } from '../../providers/EtProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDiamond, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';

type eventUserSel = {
    id: number;
    eventId: string;
    eventDate: Date;
    userId: number;
    userSel: string;
    createdAt: Date;
}
type userSelSumType = {
    userSel: string;
    date: string;
    count: number;
}

const AttendMng = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;

    //■  useEtContext
    const { isCoordinator, curentEventId, setCurentEventId } = useEtContext()
    const [userSelSum, setUserSelSum] = useState<userSelSumType[]>();

    // eventidが変わった時にcurentEventIdを更新
    useEffect(() => {
        if (typeof eventid === 'string') {
            setCurentEventId(eventid);
        }
    }, [eventid, curentEventId, setCurentEventId]);
    // userSel毎の合計を計算
    useEffect(() => {
        function summarizeByUserSel(data: eventUserSel[] | undefined) {
            const summaryObject = data?.reduce((acc, { eventDate, userSel }) => {
                const date = new Date(eventDate); // Ensure eventDate is a Date object
                const dateStr = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
                if (!acc[userSel]) {
                    acc[userSel] = {};
                }
                if (!acc[userSel][dateStr]) {
                    acc[userSel][dateStr] = 0;
                }
                acc[userSel][dateStr]++;
                return acc;
            }, {} as Record<string, Record<string, number>>);
            // Convert the summary object to an array of objects
            const summaryArray = [];
            for (const userSel in summaryObject) {
                for (const dateStr in summaryObject[userSel]) {
                    summaryArray.push({
                        userSel,
                        date: dateStr,
                        count: summaryObject[userSel][dateStr]
                    });
                }
            }
            return summaryArray;
        }
        const summary = summarizeByUserSel(eventUserSel);
        setUserSelSum(summary)
        console.log(summary);
    }, [])

    //■  trcp
    let eventIdtmp = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }
    const { data: event } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventDate } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUser } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUserSel } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    const onClickEventshare = useCallback(() => {
        const url: string = event?.[0]?.eventUrl ?? "";
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
    }, [event]);

    const onClickUserUpdate = useCallback((userId: number) => {
        router.push({
            pathname: '/components/AttendUpdateDialog',
            query: { eventid: eventid, userid: userId },
        });
    }, [router, eventid]);


    return (
        <div className="flex-wrap flex-row gap-1 m-2">
            {/* ■■■■■■■■■ヘッド・メニュー■■■■■■■■■ */}
            {isCoordinator ? (<HeaderCoordinator />) : null}
            {/* ■■■■■■■■■出席者一覧■■■■■■■■■ */}
            <div>
                <h1 className='font-bold'>{event?.[0]?.eventName}</h1>
                <div className="flex flex-col justify-center gap-2">
                    <p className=' text-base ml-3'>回答者：{eventUser?.length}名</p>
                    <h1 className='font-bold'>イベントメモ</h1>
                    <p className=' text-base ml-3'>{event?.[0]?.eventMemo}</p>
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
                            <TableBody >
                                {eventUser?.map((user, index) => (
                                    <TableRow key={index} onClick={() => onClickUserUpdate(user.userId)}>
                                        <TableCell className='pl-2 p-0 text-lg font-bold'>{user.userName}</TableCell>
                                        {eventUserSel?.filter(e => e.userId === user.userId).map((user, idx) => (
                                            <TableCell key={idx} className='p-1  text-center'>
                                                <div className="block ">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            user.userSel === "○" ? faCircle :
                                                                user.userSel === "◇" ? faDiamond :
                                                                    user.userSel === "×" ? faXmark : faMinus
                                                        }
                                                        className={"cursor-pointer " + (
                                                            user.userSel === "○" ? "text-orange-500" :
                                                                user.userSel === "◇" ? "text-gray-300" :
                                                                    user.userSel === "×" ? "text-yellow-100" : "text-slate-500"
                                                        )}
                                                        style={{ width: '24px', height: '24px', margin: 'auto' }}
                                                    />
                                                </div>
                                            </TableCell>
                                        ))}
                                        <TableCell className='w-96 p-0'>{user.userMemo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className=' ml-2'>
                        出欠変更は名前行をクリックしてください
                    </div>
                    <Button className=" bg-blue-500 text-blue-200 text-base font-bold" onClick={onClickEventshare}>イベントＵＲＬをシェア</Button>
                </div>
            </div>
            {/* ■■■■■■■■■出席入力ダイアログ■■■■■■■■■ */}
            <AttendCreateDialog />
        </div >
    )
}

export default AttendMng