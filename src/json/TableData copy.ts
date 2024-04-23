// データ定義

下記を踏まえてschema.prismaの定義を作成して(sqllite使用)

export interface Event {
  eventId: string;
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
-----------------------

// export interface Event {
//   eventId: string;
//   eventName: string;
//   eventUrl: string;
//   eventMemo: string;
//   eventDate: Date[];
//   EventUser: EventUser[];
// }

// export interface EventUser {
//   userId: Number;
//   userName: string;
//   userMemo: string;
//   userSel: string[];
// }

// export const EventData: Event[] = [
//   {
//     eventId: "fdafdas",
//     eventName: "北海道旅行",
//     eventUrl: "https://chat.openai.com/g/g-M0NO10kiB-japanese-japan-ri-ben-yu",
//     eventMemo: "旅行の日程を調整です。99/99までが締め切りです。",
//     eventDate: [
//       new Date('2024-07-01'),
//       new Date('2024-07-08'),
//       new Date('2024-07-15'),
//       new Date('2024-10-01'),
//       new Date('2024-10-08'),
//     ],
//     EventUser: [
//       {
//         userId: 1,
//         userName: "晋一",
//         userMemo: "ぜひ参加します。",
//         userSel: ["〇", "△", "〇", "×"]
//       },
//       {
//         userId: 2,
//         userName: "敬子",
//         userMemo: "ぜひ参加します。",
//         userSel: ["〇", "△", "〇", "×"]
//       },
//     ]
//   },
// ]

// Schema.prisma定義

// model Event {
//   eventId    string @id @default (uuid())
//   eventName  String
//   eventUrl   String
//   eventMemo  String
//   eventDate  DateTime[] // Date型の配列として定義
//   EventUser  EventUser[] // 関連するユーザー
// }

// model EventUser {
//   userId     Int @id @default (autoincrement())
//   userName   String
//   userMemo   String
//   userSel    String[]  // 選択肢を文字列の配列として定義
//   eventId    string       // Eventモデルとのリレーション
//   Event      Event @relation(fields: [eventId], references: [eventId])
// }
// ---------------
//   上記に対してtrpcのcrudの実装を生成願います。実装では下記の
//   実装方式でお願いします。
//   import * as trpc from "@trpc/server";
// import { z } from "zod";

// import { Context } from "./context";

// export const serverRouter = trpc
//   .router<Context>()
//   .query("etEvent_findAll", {
//     resolve: async ({ ctx }) => {
//       return await ctx.prisma.etEvent.findMany();
//     },
//   })
//   .query("etEvent_getById", {
//     input: z.object({
//       eventId: z.number(),
//     }),
//     resolve: async ({ ctx, input }) => {
//       return ctx.prisma.etEvent.findUnique({
//         where: { eventId: input.eventId },
//       });
//     },
//   })
//   .mutation("etEvent_create", {
//     input: z.object({
//       eventName: z.string(),
//       eventUrl: z.string(),
//       eventMemo: z.string().optional(),
//     }),
//     resolve: async ({ ctx, input }) => {
//       return ctx.prisma.etEvent.create({
//         data: {
//           eventName: input.eventName,
//           eventUrl: input.eventUrl,
//           eventMemo: input.eventMemo,
//         },
//       });
//     },
//   })
//   .mutation("etEvent_update", {
//     input: z.object({
//       eventId: z.number(),
//       eventName: z.string(),
//       eventUrl: z.string(),
//       eventMemo: z.string().optional(),
//     }),
//     resolve: async ({ ctx, input }) => {
//       return ctx.prisma.etEvent.update({
//         where: { eventId: input.eventId },
//         data: {
//           eventName: input.eventName,
//           eventUrl: input.eventUrl,
//           eventMemo: input.eventMemo,
//         },
//       });
//     },
//   })
//   .mutation("etEvent_delete", {
//     input: z.object({
//       eventId: z.number(),
//     }),
//     resolve: async ({ ctx, input }) => {
//       return ctx.prisma.etEvent.delete({
//         where: { eventId: input.eventId },
//       });
//     },
//   });
// export type ServerRouter = typeof serverRouter;


