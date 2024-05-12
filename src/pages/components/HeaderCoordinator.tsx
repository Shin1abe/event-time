import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger }
    from "@/pages/components/ui/dropdown-menu"
import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";
import { useEtContext } from '../providers/EtProvider';

const HeaderCoordinator = () => {
    //■  initial
    const router = useRouter();
    // const { eventid } = router.query;//TODO

    //■  useEtContext
    const { isCoordinator, setIsCoordinator, curentEventId, setCurentEventId } = useEtContext()
    const eventid = curentEventId.length > 0 ? curentEventId : router.query.eventid;

    //■  trcp
    let eventIdtmp: string = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }
    const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    // const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    // const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    // const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);
    const deleteMutation = trpc.useMutation(["Event_delete"]);

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

    return (
        <>
            <div className='flex justify-between'>
                <div >
                    <Button >
                        {event?.[0] ? (<Link href="/"><a>戻る</a></Link>) : null}
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
            <hr className='mt-2 mb-2' />
        </>
    )
}

export default HeaderCoordinator