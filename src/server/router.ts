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
      const { eventId, ...updateData } = input;
      return await ctx.prisma.event.update({
        where: { eventId },
        data: updateData,
      });
    },
  })
  .mutation("Event_delete", {
    input: z.object({
      eventId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { eventId } = input;
      return await ctx.prisma.event.delete({
        where: { eventId },
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
      eventDate: z.string(), // Dateを文字列として受け取る例
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
      eventDate: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      return await ctx.prisma.eventDate.update({
        where: { id },
        data: updateData,
      });
    },
  })
  .mutation("EventDate_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.eventDate.delete({
        where: { id },
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
    }),
    resolve: async ({ ctx, input }) => {
      const { userId, ...updateData } = input;
      return await ctx.prisma.eventUser.update({
        where: { userId },
        data: updateData,
      });
    },
  })
  .mutation("EventUser_delete", {
    input: z.object({
      userId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      const { userId } = input;
      return await ctx.prisma.eventUser.delete({
        where: { userId },
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
      userSel: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      return await ctx.prisma.eventUserSel.update({
        where: { id },
        data: updateData,
      });
    },
  })
  .mutation("EventUserSel_delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.eventUserSel.delete({
        where: { id },
      });
    },
  });

export type ServerRouter = typeof serverRouter;
