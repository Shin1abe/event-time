export interface lEvent {
    eventId: string;
    eventName: string;
    eventUrl: string;
    eventMemo: string;
}

export interface lEventDate {
    eventId: string;
    eventDate: Date;
}


const EventData: lEvent[] = [
    {
        eventId: "2",
        eventName: "台湾旅行",
        eventUrl: "https://news.yahoo.co.jp/pickup/6498509",
        eventMemo: "旅行の日程を調整です。99/99までが締め切りです。",
    },
]

const EventDateData: lEventDate[] = [
    {
        eventId: "1",
        eventDate: new Date('2024-07-01'),
    },
]

