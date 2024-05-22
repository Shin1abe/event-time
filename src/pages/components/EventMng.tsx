import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import 'react-day-picker/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Event, EventDate } from "@prisma/client";
import EventCreateDialog from './EventCreateDialog';
import { formatDateWithDayOfWeek } from '@/utils/utils';
import { useEtContext } from '../../providers/EtProvider';

const EventMng = () => {
  //■  initial
  const router = useRouter();
  // const [mode, setMode] = useContext(EventTimeContext)

  //■  useEtContext
  const { setIsCoordinator } = useEtContext()
  useEffect(() => {
    setIsCoordinator(true)
  }, [])


  //■  trpc
  const { data: etEvent, refetch } = trpc.useQuery(["Event_findMany"]);
  const { data: etEventDate, error } = trpc.useQuery(['EventDate_findMany']);

  //■  event
  const handleCardClick = (eventId: string) => {
    router.push({
      pathname: '/components/AttendMng',
      query: { eventid: eventId },
    });
  }

  return (
    // ■■■■■■■■■イベント作成画面■■■■■■■■■
    <div className="flex-wrap flex-row gap-1 m-2">
      <h1 className='m-1 text-2xl font-bold'></h1>
      <hr />
      <h1 className='m-1 text-2xl+ font-bold'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        {etEvent?.map((eventdata: Event, index: number) => (
          <Card className='m-3 bg-blue-50' key={index} onClick={() => handleCardClick(eventdata.eventId)}>
            <CardHeader>
              <CardTitle ><Badge className='mb-2'>イベント作成</Badge><p className='m-1'>{eventdata.eventName}</p></CardTitle>
            </CardHeader>
            <CardContent>
              <p className='ml-3'>
                {etEventDate?.filter((edd: EventDate) => edd.eventId === eventdata.eventId)
                  .map((edd: EventDate, index: any) => (
                    <React.Fragment key={index}>
                      {formatDateWithDayOfWeek(edd.eventDate)}
                      {index !== (etEventDate.filter((edd: EventDate) => edd.eventId === eventdata.eventId)).length - 1 && ', '}
                    </React.Fragment>
                  ))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* ■■■■■■■■■イベント作成ダイアログ■■■■■■■■■ */}
      <div >
        <EventCreateDialog />
      </div>
    </div >
  )
}

export default EventMng
