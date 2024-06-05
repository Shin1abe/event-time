import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import 'react-day-picker/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { lEvent, lEventDate } from '@/type/EventType';
import EventCreateDialog from './EventCreateDialog';
import { formatDateWithDayOfWeek } from '@/utils/utils';
import { useEtContext } from '../../providers/EtProvider';
import { lStrageCrud } from '@/utils/LStrageCRUD';

const EventMng = () => {
  //■  initial
  const router = useRouter();

  //■  useEtContext
  const { setIsCoordinator } = useEtContext()
  useEffect(() => {
    setIsCoordinator(true)
  }, [])


  //■  trpc
  const [lEvent, setlEvent] = useState<lEvent[] | null>(null);
  const [lEventDate, setlEventDate] = useState<lEventDate[] | null>(null);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await lStrageCrud("RED")
        if (data) {
          setlEvent(data.levents);
          setlEventDate(data.leventDates);
        } else {
          console.log('イベントが見つかりませんでした');
        }
      } catch (err) {
        console.error('データの取得中にエラーが発生しました:', err);
      }
    };
    fetchEvent();
  }, []);

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
      <h1 className='m-3 text-2xl+ font-bold'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        {lEvent?.map((eventdata: lEvent, index: number) => (
          <Card className='m-3 bg-slate-800' key={index} onClick={() => handleCardClick(eventdata.eventId)}>
            <CardHeader>
              <CardTitle ><Badge className='mb-2 text-blue-800'>イベント作成</Badge><p className='m-1 mb-2'>{eventdata.eventName}</p></CardTitle>
            </CardHeader>
            <CardContent >
              <p className='ml-3'>
                {lEventDate?.filter((edd: lEventDate) => edd.eventId === eventdata.eventId)
                  .map((edd: lEventDate, index: any) => (
                    <React.Fragment key={index}>
                      {formatDateWithDayOfWeek(edd.eventDate)}
                      {index !== (lEventDate.filter((edd: lEventDate) => edd.eventId === eventdata.eventId)).length - 1 && ', '}
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