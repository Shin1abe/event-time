import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const serverRouter = trpc
  .router<Context>()
  // Eventモデルの操作
  .query("Event_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.event.findMany();
    },
  })
  .query("Event_findUnique", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.findUnique({
        where: { eventId: input.eventId },
      });
    },
  })
  .mutation("Event_create", {
    input: z.object({
      eventId: z.string(),
      eventName: z.string(),
      eventUrl: z.string(),
      eventMemo: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.create({
        data: input,
      });
    },
  })
  .mutation("Event_update", {
    input: z.object({
      eventId: z.string(),
      eventName: z.string(),
      eventUrl: z.string(),
      eventMemo: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.update({
        where: { eventId: input.eventId },
        data: input,
      });
    },
  })
  .mutation("Event_delete", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.delete({
        where: { eventId: input.eventId },
      });
    },
  })
  // EventDateモデルの操作
  .query("EventDate_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.eventDate.findMany();
    },
  })
  .query("EventDate_findUnique", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.findUnique({
        where: { id: input.id },
      });
    },
  })
  .mutation("EventDate_create", {
    input: z.object({
      eventId: z.string(),
      eventDate: z.date(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.create({
        data: input,
      });
    },
  })
  .mutation("EventDate_update", {
    input: z.object({
      id: z.number(),
      eventId: z.string(),
      eventDate: z.date(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .mutation("EventDate_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.delete({
        where: { id: input.id },
      });
    },
  })
  // EventUserモデルの操作
  .query("EventUser_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.eventUser.findMany();
    },
  })
  .query("EventUser_findUnique", {
    input: z.object({
      userId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.findUnique({
        where: { userId: input.userId },
      });
    },
  })
  .mutation("EventUser_create", {
    input: z.object({
      userName: z.string(),
      userMemo: z.string(),
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.create({
        data: input,
      });
    },
  })
  .mutation("EventUser_update", {
    input: z.object({
      userId: z.number(),
      userName: z.string(),
      userMemo: z.string(),
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.update({
        where: { userId: input.userId },
        data: input,
      });
    },
  })
  .mutation("EventUser_delete", {
    input: z.object({
      userId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.delete({
        where: { userId: input.userId },
      });
    },
  })
  // EventUserSelモデルの操作
  .query("EventUserSel_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.eventUserSel.findMany();
    },
  })
  .query("EventUserSel_findUnique", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.findUnique({
        where: { id: input.id },
      });
    },
  })
  .mutation("EventUserSel_create", {
    input: z.object({
      userId: z.number(),
      userSel: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.create({
        data: input,
      });
    },
  })
  .mutation("EventUserSel_update", {
    input: z.object({
      id: z.number(),
      userId: z.number(),
      userSel: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .mutation("EventUserSel_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.delete({
        where: { id: input.id },
      });
    },
  });

//   schema.prisma定義
// -----------
// datasource db {
//   provider = "sqlite"
//   url      = "file:./dev.db"
// }

// model Event {
//   id Int @id @default(autoincrement())
//   eventId String @unique
//   eventName String
//   eventUrl String
//   eventMemo String
//   updatedAt DateTime @updatedAt
//   eventDate EventDate[]
//   EventUser EventUser[]
// }

// model EventDate {
//   id Int @id @default(autoincrement())
//   eventId String
//   eventDate DateTime
//   updatedAt DateTime @updatedAt
//   Event Event @relation(fields: [eventId], references: [eventId])
// }

// model EventUser {
//   userId Int @id @default(autoincrement())
//   userName String
//   userMemo String
//   eventId String
//   updatedAt DateTime @updatedAt
//   Event Event @relation(fields: [eventId], references: [eventId])
//   EventUserSel EventUserSel[]
// }

// model EventUserSel {
//   id Int @id @default(autoincrement())
//   userId Int
//   userSel String
//   updatedAt DateTime @updatedAt
//   EventUser EventUser @relation(fields: [userId], references: [userId])
// }
// -----------
// 上記を踏まえて、下記のソースを書き直して参考にして、各モデル(Event,EventDate,EventUser,EventUserSel)の
// findMany、findUnique、update、create、deleteソースをtypeScript生成願う。
// また、クライアントからの呼び出しサンプルを作成してください。なお、serverRouterは一つで統一ください。
// -------------
// import * as trpc from "@trpc/server";
// import { z } from "zod";
// import { Context } from "./context";

// export const serverRouter = trpc
//   .router<Context>()
//   // Eventモデルの操作
//   .query("Event_findMany", {
//     resolve: async ({ ctx }) => {
//       return await ctx.prisma.event.findMany();
//     },
//   })
//   .query("Event_findUnique", {
//     input: z.object({
//       eventId: z.string(),
//     }),
//     resolve: async ({ ctx, input }) => {
//       return await ctx.prisma.event.findUnique({
//         where: { eventId: input.eventId },
//       });
//     },
//   })
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// https://ai-foundation-chat-dot-ai-web-ui-prod.an.r.appspot.com/
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

