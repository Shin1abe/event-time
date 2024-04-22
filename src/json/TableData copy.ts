export interface Event {
  eventId: Number;
  eventName: string;
  eventUrl: string;
  eventMemo: string;
  eventDate: Date[];
  EventUser: EventUser[];
}

export interface EventUser {
  userId: Number;
  userName: string;
  userMemo: string;
  userSel: string[];
}

export const EventData: Event[] = [
  {
    eventId: 1,
    eventName: "北海道旅行",
    eventUrl: "https://chat.openai.com/g/g-M0NO10kiB-japanese-japan-ri-ben-yu",
    eventMemo: "旅行の日程を調整です。99/99までが締め切りです。",
    eventDate: [new Date('2024-07-01'),
    new Date('2024-07-08'),
    new Date('2024-07-15'),
    new Date('2024-10-01'),
    new Date('2024-10-08'),
    ],
    EventUser: [
      {
        userId: 1,
        userName: "晋一",
        userMemo: "ぜひ参加します。",
        userSel: ["〇", "△", "〇", "×"]
      },
      {
        userId: 2,
        userName: "敬子",
        userMemo: "ぜひ参加します。",
        userSel: ["〇", "△", "〇", "×"]
      },
    ]
  },
]

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}

model Event {
  eventId    Int @id @default (autoincrement())
  eventName  String
  eventUrl   String
  eventMemo  String
  eventDate  DateTime[] // Date型の配列として定義
  EventUser  EventUser[] // 関連するユーザー
}

model EventUser {
  userId     Int @id @default (autoincrement())
  userName   String
  userMemo   String
  userSel    String[]  // 選択肢を文字列の配列として定義
  eventId    Int       // Eventモデルとのリレーション
  Event      Event @relation(fields: [eventId], references: [eventId])
}
