import { lEvent, lEventDate } from '../type/EventType';
import * as localforage from 'localforage';

// ローカルストレージに管理者として起票したエベント情報をCRUD
//IN    :mode,eventId,現在のeventidに対するデータ（lEvent,lEventDate[]）
//OUT   :data={levents:lEvent[],leventDates:lEventDate[]}

export const lStrageCrud = async (
    mode: 'CRT' | 'RED' | 'UPD' | 'DEL',
    eventId?: string,
    eventData?: lEvent,
    eventDateData?: lEventDate[]
) => {
    try {
        // インスタンス生成
        // console.log('localforageのインスタンスを初期化中');
        const etLf = localforage.createInstance({
            driver: localforage.LOCALSTORAGE,
            name: 'EventTime',
            storeName: 'et',
            version: 1
        });

        // 全格納データ（lEvent[], lEventDate[]）読み込み（共通）
        // console.log('格納データを読み込み中');
        const storedEvents = (await etLf.getItem<lEvent[]>('events')) || [];
        const storedEventDates = (await etLf.getItem<lEventDate[]>('eventDates')) || [];
        // console.log('読み込んだイベント:', storedEvents);
        // console.log('読み込んだイベント日付:', storedEventDates);

        let updatedEvents = [...storedEvents];
        let updatedEventDates = [...storedEventDates];

        switch (mode) {
            case 'CRT':
                if (eventData && eventDateData) {
                    // 現在のeventIdに対するデータを読み込んだ格納データに追加
                    console.log('新しいイベントを作成中');
                    updatedEvents.push(eventData);
                    eventDateData.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
                    updatedEventDates.push(...eventDateData);
                }
                break;
            case 'RED':
                // 処理後のデータを返却
                // console.log('RED処理');
                // return { levents: storedEvents, leventDates: storedEventDates };
                break;
            case 'UPD':
                if (eventData && eventDateData) {
                    // 現在のeventIdに対するデータを格納データに対して更新
                    // console.log('イベントを更新中');
                    updatedEvents = updatedEvents.map(ev => ev.eventId === eventId ? eventData : ev);
                    eventDateData.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
                    updatedEventDates = updatedEventDates.filter(ed => ed.eventId !== eventId).concat(eventDateData);
                }
                break;
            case 'DEL':
                // 現在のeventIdをキーにして読み込んだ格納データから削除
                // console.log('イベントを削除中');
                updatedEvents = updatedEvents.filter(ev => ev.eventId !== eventId);
                updatedEventDates = updatedEventDates.filter(ed => ed.eventId !== eventId);
                break;
            default:
                throw new Error(`未知のモードです: ${mode}`);
        }

        // 処理後のデータを保存
        // console.log('更新されたデータを保存中');
        await etLf.setItem('events', updatedEvents);
        await etLf.setItem('eventDates', updatedEventDates);

        // 処理後のデータを返却
        // console.log('更新されたデータを返却中');
        return { levents: updatedEvents, leventDates: updatedEventDates };
    } catch (error) {
        console.error('lStrageCrudでエラーが発生しました:', error);
        throw error;
    }
};