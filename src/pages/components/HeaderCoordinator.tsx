import React, { useCallback } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { Button } from '../../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger }
    from "@/ui/dropdown-menu"
// import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";
import { useEtContext } from '../../providers/EtProvider';

const HeaderCoordinator = () => {
    //■  initial
    const router = useRouter();

    //■  useEtContext
    const { curentEventId } = useEtContext()
    const eventid = curentEventId.length > 0 ? curentEventId : router.query.eventid;

    //■  trcp
    let eventIdtmp = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }
    const { data: event } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);

    //■  event

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
    }, []);

    const onClickEventChange = useCallback(() => {
        router.push({
            pathname: '/components/EventUpdateDialog',
            query: { eventid: eventid },
        });
    }, []);

    const onClickEventDelete = useCallback(() => {
        router.push({
            pathname: '/components/EventDeleteDialog',
            query: { eventid: eventid },
        });
    }, []);

    return (
        <>
            <div className='flex justify-between'>
                <div >
                    <Button className='bg-blue-500 text-blue-200'>
                        {event?.[0] ? (<Link href="/"
                        ><a>戻る</a></Link>) : null}
                    </Button>
                </div>
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger className='p-1'>イベント作成者向けメニュー</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>イベント管理メニュー</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Button className='bg-blue-500 text-blue-200' onClick={onClickEventChange} >イベント更新</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button className='bg-blue-500 text-blue-200' onClick={onClickEventshare} >イベント更新ＵＲＬをシェア</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button className='bg-blue-500 text-blue-200' onClick={onClickEventDelete} >イベント削除</Button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr className='mt-2 mb-2' />
        </>
    )
}

export default HeaderCoordinator