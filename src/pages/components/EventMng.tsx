import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import cuid from 'cuid';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

import {
  Event,
  EventDate,
  EventUser,
  EventUserSel
} from "@prisma/client";
import EventCreateDialog from './EventCreateDialog';

const EventMng = () => {
  //■  initial
  const router = useRouter();
  const initialDays: Date[] = [];

  //■  useState
  const [eventName, setEventName] = useState<string>("");
  const [eventUrl, setEventUrl] = useState<string>("");;
  const [eventMemo, setEventMemo] = useState<string>("");;
  const [eventDates, setEventsDates] = React.useState<Date[] | undefined>(initialDays);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //■  trpc
  const { data: etEvent, refetch } = trpc.useQuery(["Event_findMany"]);
  const { data: etEventDate, error } = trpc.useQuery(['EventDate_findMany']);

  const eventCreateMutation = trpc.useMutation(["Event_create"]);
  const eventCreate = async (newEvent: {
    eventId: string;
    eventName: string;
    eventUrl: string;
    eventMemo: string;
  }) => {
    await eventCreateMutation.mutate(newEvent);
  };
  const eventdateCreateMutation = trpc.useMutation(["EventDate_create"]);//TODO
  const eventdateCreate = async (newEvent: {
    eventId: string;
    eventDate: string;
  }) => {
    await eventdateCreateMutation.mutate({
      eventId: newEvent.eventId,
      eventDate: newEvent.eventDate, // 日付型のまま渡す
    });
  };

  //■  event
  const clearButton = () => setEventsDates(initialDays);

  // イベント作成ボタン押下
  const eventCreateButtonClick = async () => {
    if (eventName.length === 0) { alert("イベント名が設定されていません"); return }//TODO TOAST
    if (eventDates?.length === 0) { alert("日程候補が設定されていません"); return }//TODO TOAST
    try {
      const eventid = cuid();
      const urlParts = new URL(window.location.href);
      const baseURL = `${urlParts.protocol}//${urlParts.host}/`;
      // console.log(baseURL)
      const eventurl = baseURL + "components/AttendMng?eventid=" + eventid;
      // console.log(eventurl)
      await eventCreate({ eventId: eventid, eventName: eventName, eventUrl: eventurl, eventMemo: eventMemo });

      eventDates?.map(async (eventdate) => {
        try {
          await eventdateCreate({ eventId: eventid, eventDate: eventdate.toISOString() });
          // console.log("eventdateCreate= " + eventid + " eventdateCreate= " + eventdate.toISOString())
        } catch (err) {
          console.log(err)
        }
      })
      router.push({
        pathname: '/components/AttendMng',
        query: { eventid: eventid },
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const handleCardClick = (eventId: string) => {
    router.push({
      pathname: '/components/AttendMng',
      query: { eventid: eventId },
    });
  }

  //■  util
  //  初期画面（幹事）日付を "MM/DD(曜日)" の形式で表示する関数
  function formatDateWithDayOfWeek(date: Date): string {
    if (date !== null) {
      const newDate = new Date(date)
      const month = (newDate.getMonth() + 1).toString();
      const day = newDate.getDate().toString();
      const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      const dayOfWeek = daysOfWeek[newDate.getDay()];
      return `${month}/${day}(${dayOfWeek})`;
    } else {
      return "No date available";
    }
  }

  //イベント作成ダイアログfooter　
  const footer =
    eventDates && eventDates.length > 0 ? (
      <div className='grid-cols-2 flex'>
        <div className='flex-3 text-left'>選択日数： {eventDates.length} 日.</div>
        <div className='flex-1 text-right'>
          <Button variant="outline" onClick={clearButton}>clear</Button>
        </div>
      </div>
    ) : (
      <></>
    );

  return (
    // ■■■■■■■■■　幹事画面　■■■■■■■■■
    <div className="flex-wrap flex-row gap-1 m-2">
      <h1 className='m-1 text-2xl font-bold'></h1>
      <hr />
      <h1 className='m-1 text-2xl+ font-bold'>イベント</h1>
      <div className="flex flex-col justify-center gap-2">
        {etEvent?.map((eventdata: Event, index: number) => (
          <Card className='m-3 bg-blue-50' key={index} onClick={() => handleCardClick(eventdata.eventId)}>
            <CardHeader>
              <CardTitle ><Badge className='mb-2'>幹事</Badge><p className='m-1'>{eventdata.eventName}</p></CardTitle>
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
      {/* ■■■■■■■■■　イベント作成ダイアログ　■■■■■■■■■ */}
      <div >
        <EventCreateDialog />
      </div>
    </div >
  )
}

export default EventMng
