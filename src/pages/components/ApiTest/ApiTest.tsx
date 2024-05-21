import React, { useCallback, useEffect, useState } from 'react'
import { trpc } from "@/utils/trpc";
import { Button } from '../ui/button'

const ApiTest = () => {
    const { data: eventUsers, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findMany"]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: async () => {
            await eventUserRefetch(); // 更新後のデータを再取得する
        },
    });
    const createEvent = useCallback(async () => {
        const eventId = "aaaa"
        await EventUserCreateMutation.mutate({
            eventId: eventId,
            userName: "Abe1",
            userMemo: "AbeMemo",
        });
        // await eventUserRefetch()
        // await console.log(eventUser)
    }, [EventUserCreateMutation]);

    useEffect(() => {
        // console.log(eventUsers?.map(data => data.userId)); // データが更新されたらログに出力
    }, [eventUsers]);

    return (<>
        <div className='grid'>
            <div>ApiTest</div>
            <Button className='m-1' onClick={() => createEvent()}>作成</Button>
        </div>
    </>
    )
}
export default ApiTest
// const delEvent = useCallback(async () => {
//     if (eventId === "") return
//     await EventDeleteMutation.mutate({ eventId: eventId })
//     await EventDateDeleteMutation.mutate({ id:  })
//     await EventUserDeleteMutation.mutate({ userId:  })
//     await EventUserSelDeleteMutation.mutate({ id:  })
//     setEventId("")
// }, [eventId]);