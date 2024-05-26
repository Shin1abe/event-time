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
} from "../../ui/alert-dialog"

const AttendDeleteDialog = () => {
    //■  initial
    const router = useRouter();
    const { eventid, userid } = router.query;
    const eventIdtmp: string = eventid as string;
    const userIdtmp: number = parseFloat(userid as string);

    const [isSubmitting, setIsSubmitting] = useState(false);

    //■  trpc query
    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    //■  trpc mustaiton
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
        setIsSubmitting(true);
        await EventUserDeleteMutation.mutate({ userId: userIdtmp });
        console.log("etEventUserSels", etEventUserSels)
        console.log("userIdtmp", userIdtmp)
        etEventUserSels?.map(async (d) => {
            console.log("userIdtmp", userIdtmp)
            console.log("d.userId", d.userId)
            if (d.userId === userIdtmp)
                // console.log("d.userId === userIdtmp")
                await EventUserSelDeleteMutation.mutate({ id: d.id });
        })

        setIsSubmitting(false);
        router.push({
            pathname: '/components/AttendMng',
            query: { eventid: eventid },
        }).then(() => {
            router.reload();
        });
    }, []);

    return (
        <div >
            <AlertDialog defaultOpen={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>対象の出欠を削除します。よろしいですか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            この操作は元に戻すことができません。これにより出欠が完全に削除されます
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={onClickCancell}
                            disabled={isSubmitting} >
                            キャンセル
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onClickDelete}
                            disabled={isSubmitting} >
                            {isSubmitting ? '送信中...' : '削除'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AttendDeleteDialog
