import { db } from "@/db/drizzle";
import { agents, meetings } from "@/db/schema";
import { polarClient } from "@/lib/polar";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, eq } from "drizzle-orm";

export const premiumRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    const subscription = customer.activeSubscriptions[0];

    if (!subscription) {
      return null;
    }

    const product = await polarClient.products.get({
      id: subscription.productId,
    });
    return product;
  }),
  getProducts: protectedProcedure.query(async ({}) => {
    const pages = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
    });

    const products = [];

    for await (const page of pages) {
      products.push(...page.result.items);
    }
    return products;
  }),
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const customerState = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    const subscription = customerState.activeSubscriptions[0];

    if (subscription) {
      return null;
    }

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(and(eq(meetings.userId, ctx.auth.user.id)));

    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return {
      meetingCount: userMeetings.count,
      agentsCount: userAgents.count,
    };
  }),
});
