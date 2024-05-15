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
  .query("Event_findWhereMany", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    },
  })
  .query("Event_findUnique", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.findUnique({
        where: {
          eventId: input.eventId,
        },
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
        data: {
          eventId: input.eventId,
          eventName: input.eventName,
          eventUrl: input.eventUrl,
          eventMemo: input.eventMemo,
        },
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
      console.log(" Event_update Called");

      return await ctx.prisma.event.update({
        where: {
          eventId: input.eventId,
        },
        data: {
          eventName: input.eventName,
          eventUrl: input.eventUrl,
          eventMemo: input.eventMemo,
        },
      });
    },
  })
  .mutation("Event_delete", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.event.delete({
        where: {
          eventId: input.eventId,
        },
      });
    },
  })
  // EventDateモデルの操作
  .query("EventDate_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.eventDate.findMany();
    },
  })
  .query("EventDate_findWhereMany", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    },
  })
  .query("EventDate_findUnique", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("EventDate_create", {
    input: z.object({
      eventId: z.string(),
      eventDate: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(" EventDate_create Called:" + input.eventDate);
      return await ctx.prisma.eventDate.create(
        {
          data: {
            eventId: input.eventId,
            eventDate: new Date(input.eventDate),
          },
        });
    },
  })
  .mutation("EventDate_update", {
    input: z.object({
      id: z.number(),
      eventId: z.string(),
      eventDate: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventDate.update({
        where: {
          id: input.id,
        },
        data: {
          eventId: input.eventId,
          eventDate: new Date(input.eventDate),
        },
      });
    },
  })
  .mutation("EventDate_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(" EventDate_delete Called");
      return await ctx.prisma.eventDate.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  // EventUserモデルの操作
  .query("EventUser_findMany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.eventUser.findMany();
    },
  })
  .query("EventUser_findWhereMany", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.findMany({
        where: {
          eventId: input.eventId,
        },
      });
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
      eventId: z.string(),
      userName: z.string(),
      userMemo: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const createdEventUser = await ctx.prisma.eventUser.create({
        data: {
          eventId: input.eventId,
          userName: input.userName,
          userMemo: input.userMemo,
        },
      });
      return createdEventUser; // Return the created EventUser
    },
  })

  .mutation("EventUser_update", {
    input: z.object({
      userId: z.number(),
      userName: z.string(),
      userMemo: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUser.update({
        where: { userId: input.userId },
        data: {
          userName: input.userName,
          userMemo: input.userMemo,
        },
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
  .query("EventUserSel_findWhereMany", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.findMany({
        where: {
          eventId: input.eventId,
        },
      });
    },
  })
  .query("EventUserSel_findUnique", {
    input: z.object({
      id: z.number(),
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.findUnique({
        where: { id: input.id },
      });
    },
  })
  .mutation("EventUserSel_create", {
    input: z.object({
      eventId: z.string(),
      userId: z.number(),
      eventDate: z.string(),
      userSel: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(" EventUserSel_create Called ");

      return await ctx.prisma.eventUserSel.create({
        data: {
          eventId: input.eventId,
          userId: input.userId,
          eventDate: new Date(input.eventDate),
          userSel: input.userSel,
        },
      });
    },
  })
  .mutation("EventUserSel_update", {
    input: z.object({
      id: z.number(),
      userSel: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.eventUserSel.update({
        where: { id: input.id },
        data: { userSel: input.userSel },
      });
    },
  })
  .mutation("EventUserSel_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(" EventUserSel_delete Called");

      return await ctx.prisma.eventUserSel.delete({
        where: { id: input.id },
      });
    },
  })
  ;

export type ServerRouter = typeof serverRouter;