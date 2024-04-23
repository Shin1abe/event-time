export interface Event {
  eventId: string;
  eventName: string;
  eventUrl: string;
  eventMemo: string;
}

export interface EventUser {
  eventId: string;
  userId: Number;
  userName: string;
  userMemo: string;
}

export interface EventDate {
  eventId: string;
  eventDate: Date;
}

export interface EventUserSel {
  eventId: string;
  userId: Number;
  eventDate: Date;
  userSel: string;
}

export const EventData: Event[] = [
  {
    eventId: "1",
    eventName: "北海道旅行",
    eventUrl: "https://chat.openai.com/g/g-M0NO10kiB-japanese-japan-ri-ben-yu",
    eventMemo: "旅行の日程を調整です。99/99までが締め切りです。",
  },
  {
    eventId: "2",
    eventName: "台湾旅行",
    eventUrl: "https://news.yahoo.co.jp/pickup/6498509",
    eventMemo: "旅行の日程を調整です。99/99までが締め切りです。",
  },
]

export const EventUserData: EventUser[] = [
  {
    eventId: "1",
    userId: 1,
    userName: "晋一",
    userMemo: "ぜひ参加します。"
  },
  {
    eventId: "1",
    userId: 2,
    userName: "敬子",
    userMemo: "ぜひ参加します。"
  },
];


export const EventDateData: EventDate[] = [
  {
    eventId: "1",
    eventDate: new Date('2024-07-01'),
  },
  {
    eventId: "1",
    eventDate: new Date('2024-07-08'),
  },
  {
    eventId: "1",
    eventDate: new Date('2024-07-15'),
  },
  {
    eventId: "2",
    eventDate: new Date('2024-10-01'),
  },
  {
    eventId: "2",
    eventDate: new Date('2024-10-08'),
  }
]

export interface EventUserSel {
  eventId: string;
  userId: Number;
  eventDate: Date;
  userSel: string;
}
export const EventUserSelData: EventUserSel[] = [
  {
    eventId: "1",
    userId: 1,
    eventDate: new Date('2024-07-01'),
    userSel: "〇"
  },
  {
    eventId: "1",
    userId: 1,
    eventDate: new Date('2024-07-08'),
    userSel: "〇"
  },
  {
    eventId: "1",
    userId: 1,
    eventDate: new Date('2024-07-15'),
    userSel: "△"
  },
  {
    eventId: "1",
    userId: 2,
    eventDate: new Date('2024-07-01'),
    userSel: "△"
  },
  {
    eventId: "1",
    userId: 2,
    eventDate: new Date('2024-07-08'),
    userSel: "〇"
  },
  {
    eventId: "1",
    userId: 2,
    eventDate: new Date('2024-07-15'),
    userSel: "△"
  },
];
