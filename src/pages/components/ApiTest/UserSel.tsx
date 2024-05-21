import React, { useEffect } from 'react'
import { trpc } from "@/utils/trpc";
import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";

const UserSel = () => {
    const eventIdtmp = "clwbcks420000356r7peciq9n";

    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    const eventDates = [new Date("2024-05-14T15:00:00.000Z"), new Date("2024-05-16T15:00:00.000Z")]

    //画面選択eventDates.日付 === etEventUserSels.eventDateは保持し、それ以外のデータは除く
    const filterEventUserSels = (etEventUserSels: EventUserSel[], eventDates: Date[]) => {
        return etEventUserSels.filter(sel => {
            let selDate = new Date(sel.eventDate).getTime();
            return eventDates.some(date => new Date(date).getTime() === selDate);
        });
    }
    useEffect(() => {
        if (!etEventUserSels || !eventDates) { console.log("未定義"); return; }
        console.log("eventDates", eventDates);
        console.log("etEventUserSels", etEventUserSels)
        // 指定された日付を取り除いた新しい配列を作成
        console.log("filterEventUserSels", filterEventUserSels(etEventUserSels, eventDates))
    }, [])
    return (<>
        <div>UserSel</div>
    </>
    )
}

export default UserSel
// etEventUserSels [
//     {
//       id: 125,
//       eventId: 'clw9wmnbq0000356rxenj7bfa',
//       eventDate: '2024-05-11T15:00:00.000Z',
//       userId: 71,
//       userSel: '〇',
//       createdAt: '2024-05-16T23:51:25.825Z'
//     },
//     {
//       id: 124,
//       eventId: 'clw9wmnbq0000356rxenj7bfa',
//       eventDate: '2024-05-14T15:00:00.000Z',
//       userId: 71,
//       userSel: '〇',
//       createdAt: '2024-05-16T23:51:25.825Z'
//     }
//   ]
//   eventDates [ 2024-05-11T15:00:00.000Z, 2024-05-14T15:00:00.000Z ]
//   etEventDates [
//     {
//       id: 221,
//       eventId: 'clw9wmnbq0000356rxenj7bfa',
//       eventDate: '2024-05-11T15:00:00.000Z',
//       createdAt: '2024-05-16T23:51:20.802Z'
//     },
//     {
//       id: 222,
//       eventId: 'clw9wmnbq0000356rxenj7bfa',
//       eventDate: '2024-05-14T15:00:00.000Z',
//       createdAt: '2024-05-16T23:51:20.802Z'
//     }
//   ]
