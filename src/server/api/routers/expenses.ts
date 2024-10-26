import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expensesRouter = createTRPCRouter({
  getExpenses: protectedProcedure.query(async ({ ctx }) => {
    const expenses = await ctx.db.expenses.findMany({
      where: {
        organizationId: ctx.session.user.organizationId,
      },
    });
    return expenses;
  }),
});
