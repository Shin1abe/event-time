import React, { useEffect } from 'react'
import { trpc } from "@/utils/trpc";
import { Event, EventDate, EventUser, EventUserSel } from "@prisma/client";

const UserSel = () => {
    const eventIdtmp = "clw9wmnbq0000356rxenj7bfa";
    // [EventDate_findWhereMany]
    const { data: etEventDates, refetch: eventDateRefetch } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);

    const eteventDates = etEventDates !== undefined && etEventDates.length > 0 ? etEventDates as EventDate[] : [];
    const eventDateArray: Date[] = eteventDates.map(item => new Date(item.eventDate));
    const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(eventDateArray);

    // [EventUserSel_findWhereMany]
    const { data: etEventUserSels } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    const filterEventUserSels = function (etEventUserSels, eventDates) {
        return etEventUserSels.filter(sel => {
            let selDate = new Date(sel.eventDate).getTime();
            return eventDates.some(date => new Date(date).getTime() === selDate);
        });
    }

    useEffect(() => {
        if (!etEventUserSels || !eventDates) { console.log("未定義"); return; }
        console.log("etEventUserSels", etEventUserSels)
        console.log("etEventDates", etEventDates)
        console.log("eventDates", eventDates)

        // 返却型：etEventUserSels
        // 仕様　：eventDates.日付 === etEventUserSels.eventDateは保持し、それ以外のデータは除く
        //         日付を比較する際は両データともutcであることを確定してgetTime()で比較する
        //テストのためeventDatesの一番名データ削除
        // Remove '2024-05-11T15:00:00.000Z' from the array
        const dateToRemove = new Date("2024-05-11T15:00:00.000Z");
        // 指定された日付を取り除いた新しい配列を作成
        setEventsDates(eventDates.filter(date => date.getTime() !== dateToRemove.getTime()));
        console.log(eventDates); // Outputs: [ '2024-05-14T15:00:00.000Z' ]
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
