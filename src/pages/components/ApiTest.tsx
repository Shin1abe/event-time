import React, { useCallback, useEffect, useState } from 'react'
import { trpc } from "@/utils/trpc";
import cuid from 'cuid';
import {
    Event,
    EventDate,
    EventUser,
    EventUserSel
} from "@prisma/client";

const ApiTest = () => {
    //■  trpc
    //findMany
    // const { data: etEvent } = trpc.useQuery(["Event_findMany"]);
    // console.log(etEvent)
    // console.log("-------------------------")
    // const { data: etEventDate } = trpc.useQuery(['EventDate_findMany']);
    // console.log(etEventDate)
    // console.log("-------------------------")
    // const { data: etEventUser } = trpc.useQuery(['EventUser_findMany']);
    // console.log(etEventUser)
    // console.log("-------------------------")
    // const { data: etEventUserSel } = trpc.useQuery(['EventUserSel_findMany']);
    // console.log(etEventUserSel)
    // console.log("-------------------------")

    //useMutation
    // const [eventId, setEventId] = useState(cuid());
    // const eventCreateMutation = trpc.useMutation(["Event_create"]);
    // const eventCreate = async () => {
    //     await eventCreateMutation.mutate({
    //         eventId: eventId,
    //         eventName: "eventName",
    //         eventUrl: "eventUrl",
    //         eventMemo: "eventMemo",
    //     });
    // };
    // eventCreate()
    const [eventId, setEventId] = useState(cuid());

    //Event
    const { data: event, refetch: eventRefetch } = trpc.useQuery(["Event_findMany"]);
    const EventCreateMutation = trpc.useMutation(["Event_create"], {
        onSuccess: () => eventRefetch(),
    });
    const updateOneMutation = trpc.useMutation(["Event_update"], {
        onSuccess: () => eventRefetch(),
    });

    //EventDate
    const { data: eventDate, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findMany"]);
    const EventDateCreateMutation = trpc.useMutation(["EventDate_create"], {
        onSuccess: () => eventDateRefetch(),
    });
    const EventDateUpdateMutation = trpc.useMutation(["EventDate_update"], {
        onSuccess: () => eventDateRefetch(),
    });

    //EventUser
    const { data: eventUser, refetch: eventUserRefetch } = trpc.useQuery(["EventUser_findMany"]);
    const EventUserCreateMutation = trpc.useMutation(["EventUser_create"], {
        onSuccess: () => eventUserRefetch(),
    });
    const EventUserUpdateMutation = trpc.useMutation(["EventUser_update"], {
        onSuccess: () => eventUserRefetch(),
    });

    //EventUserSel
    const { data: eventUserSel, refetch: eventUserSelRefetch } = trpc.useQuery(["EventUserSel_findMany"]);
    const EventUserSelCreateMutation = trpc.useMutation(["EventUserSel_create"], {
        onSuccess: () => eventUserSelRefetch(),
    });
    const EventUserSelUpdateMutation = trpc.useMutation(["EventUserSel_update"], {
        onSuccess: () => eventUserSelRefetch(),
    });

    const createEvent = useCallback(async () => {
        if (eventId === "") return
        await EventCreateMutation.mutate({
            eventId: eventId,
            eventName: "eventName",
            eventUrl: "eventUrl",
            eventMemo: "eventMemo",
        });

        await EventDateCreateMutation.mutate({
            eventId: eventId,
            eventDate: (new Date()).toISOString(),
        });

        await EventUserCreateMutation.mutate({
            eventId: eventId,
            userName: "Abe",
            userMemo: "AbeMemo",
        });

        await EventUserSelCreateMutation.mutate({
            eventId: eventId,
            userId: 1,
            userSel: "〇",
        });

        setEventId("")
    }, [eventId]);

    return (<>
        <div>ApiTest</div>
        <button onClick={() => createEvent()}>クリック</button>
    </>
    )
}
export default ApiTest
