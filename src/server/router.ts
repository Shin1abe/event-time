import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

export const serverRouter = trpc
  .router<Context>()
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.groceryList.findMany();
    },
  })
  .mutation("insertOne", {
    input: z.object({
      title: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.groceryList.create({
        data: { title: input.title },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.number(),
      title: z.string(),
      checked: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.groceryList.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteAll", {
    input: z.object({
      ids: z.number().array(),
    }),
    resolve: async ({ input, ctx }) => {
      const { ids } = input;

      return await ctx.prisma.groceryList.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    },
  })
  // etEvent
  // eventId: number;
  // eventName: string;
  // eventUrl: string;
  // eventMemo: string | null;
  .query("etEvent_findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.etEvent.findMany();
    },
  })
  .query("etEvent_getById", {
    input: z.object({
      eventId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.etEvent.findUnique({
        where: { eventId: input.eventId },
      });
    },
  })
  .mutation("etEvent_create", {
    input: z.object({
      eventName: z.string(),
      eventUrl: z.string(),
      eventMemo: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.etEvent.create({
        data: {
          eventName: input.eventName,
          eventUrl: input.eventUrl,
          eventMemo: input.eventMemo,
        },
      });
    },
  })
  .mutation("etEvent_update", {
    input: z.object({
      eventId: z.number(),
      eventName: z.string(),
      eventUrl: z.string(),
      eventMemo: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.etEvent.update({
        where: { eventId: input.eventId },
        data: {
          eventName: input.eventName,
          eventUrl: input.eventUrl,
          eventMemo: input.eventMemo,
        },
      });
    },
  })
  .mutation("etEvent_delete", {
    input: z.object({
      eventId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.etEvent.delete({
        where: { eventId: input.eventId },
      });
    },
  });
export type ServerRouter = typeof serverRouter;
