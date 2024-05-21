import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import 'react-day-picker/dist/style.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"

const EventDeleteDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid } = router.query;
    let eventIdtmp: string = ""; if (typeof eventid === "string") { eventIdtmp = eventid };

    //■  trpc query
    // [Event_findWhereMany]
    const { data: etEvents } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    // [EventDate_findWhereMany]
    const { data: etEventDates, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    // [EventUser_findWhereMany]
    const { data: etEventUser } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    //■  trpc mustaiton
    // [Event_delete]
    const EventDeleteMutation = trpc.useMutation(["Event_delete"]);
    // [EventDate_delete]
    const EventDateDeleteMutation = trpc.useMutation(["EventDate_delete"]);
    // [EventUser_delete]
    const EventUserDeleteMutation = trpc.useMutation(["EventUser_delete"]);
    // [EventUserSel_delete]
    const EventUserSelDeleteMutation = trpc.useMutation(["EventUserSel_delete"]);

    //■  event
    const onClickCancell = useCallback(async () => {
        router.push({
            pathname: '/components/AttendMng',
            query: { eventid: eventid },
        }).then(() => {
            router.reload();
        });
    }, []);
    const onClickDelete = useCallback(async () => {
        etEventUserSels?.map(async (d) => {
            await EventUserSelDeleteMutation.mutate({ id: d.id });
        })
        etEventUser?.map(async (d) => {
            await EventUserDeleteMutation.mutate({ userId: d.userId });
        })
        etEventDates?.map(async (d) => {
            await EventDateDeleteMutation.mutate({ id: d.id });
        })
        etEvents?.map(async (d) => {
            await EventDeleteMutation.mutate({ eventId: eventIdtmp });
        })

        router.push({
            pathname: '/',
            query: { eventid: eventid },
        }).then(() => {
            router.reload();
        });
    }, []);

    return (
        <div >
            <AlertDialog defaultOpen={true}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>対象のイベントを削除します。よろしいですか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            この操作は元に戻すことができません。これによりイベントが完全に削除されます
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClickCancell}>キャンセル</AlertDialogCancel>
                        <AlertDialogAction onClick={onClickDelete}>削除</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default EventDeleteDialog
