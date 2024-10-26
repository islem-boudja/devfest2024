import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { startOfMonth, endOfMonth, subMonths, lastDayOfDecade } from "date-fns";

type MonthlyData = {
  month: number;
  year: number;
  totalRevenue: number;
  totalExpenses: number;
};

type InvestmentData = {
  month: number;
  year: number;
  totalInvestment: number;
};

type DebtData = {
  month: number;
  year: number;
  totalDebt: number;
};

export const dashboardRouter = createTRPCRouter({
  getTransactionsData: protectedProcedure
    .input(
      z.object({
        type: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      let currentDateThreshold: Date;
      let previousDateThreshold: Date;

      if (input.type === "week") {
        currentDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 7),
        );
        previousDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 14),
        ); // One week prior
      } else if (input.type === "month") {
        currentDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 30),
        );
        previousDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 60),
        ); // One month prior
      } else if (input.type === "year") {
        currentDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 365),
        );
        previousDateThreshold = new Date(
          new Date().setDate(new Date().getDate() - 730),
        ); // One year prior
      } else {
        throw new Error("Invalid type specified");
      }

      // Fetch current totals
      const currentRevenue = await ctx.db.revenue.aggregate({
        _sum: { amount: true },
        where: {
          date: { gte: currentDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });
      const currentExpense = await ctx.db.expenses.aggregate({
        _sum: { amount: true },
        where: {
          date: { gte: currentDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });
      const currentInvestment = await ctx.db.investments.aggregate({
        _sum: { investment_amount: true },
        where: {
          date: { gte: currentDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });

      // Fetch previous totals
      const previousRevenue = await ctx.db.revenue.aggregate({
        _sum: { amount: true },
        where: {
          date: { gte: previousDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });
      const previousExpense = await ctx.db.expenses.aggregate({
        _sum: { amount: true },
        where: {
          date: { gte: previousDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });
      const previousInvestment = await ctx.db.investments.aggregate({
        _sum: { investment_amount: true },
        where: {
          date: { gte: previousDateThreshold },
          organizationId: ctx.session.user.organizationId,
        },
      });

      // Calculate percentage changes
      const percentageChangeRevenue =
        (((currentRevenue._sum.amount || 0) -
          (previousRevenue._sum.amount || 0)) /
          (previousRevenue._sum.amount || 1)) *
        100;
      const percentageChangeExpense =
        (((currentExpense._sum.amount || 0) -
          (previousExpense._sum.amount || 0)) /
          (previousExpense._sum.amount || 1)) *
        100;
      const percentageChangeInvestment =
        (((currentInvestment._sum.investment_amount || 0) -
          (previousInvestment._sum.investment_amount || 0)) /
          (previousInvestment._sum.investment_amount || 1)) *
        100;

      return {
        current: {
          totalRevenue: currentRevenue._sum.amount || 0,
          totalExpense: currentExpense._sum.amount || 0,
          totalInvestment: currentInvestment._sum.investment_amount || 0,
        },
        previous: {
          totalRevenue: previousRevenue._sum.amount || 0,
          totalExpense: previousExpense._sum.amount || 0,
          totalInvestment: previousInvestment._sum.investment_amount || 0,
        },
        percentageChange: {
          revenue: percentageChangeRevenue,
          expense: percentageChangeExpense,
          investment: percentageChangeInvestment,
        },
      };
    }),
  thisWeekSpendings: protectedProcedure.query(async ({ ctx }) => {
    const currentDateThreshold = new Date(
      new Date().setDate(new Date().getDate() - 7),
    );
    const investments = await ctx.db.investments.aggregate({
      _sum: { investment_amount: true },
      where: {
        date: { gte: currentDateThreshold },
        organizationId: ctx.session.user.organizationId,
      },
    });
    const asssets = await ctx.db.assetsLiabilities.aggregate({
      _sum: { asset_value: true },
      where: {
        date: { gte: currentDateThreshold },
        organizationId: ctx.session.user.organizationId,
      },
    });
    const currentExpense = await ctx.db.expenses.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: currentDateThreshold },
        organizationId: ctx.session.user.organizationId,
      },
    });
    const totalSpendings =
      (investments._sum.investment_amount || 0) +
      (asssets._sum.asset_value || 0) +
      (currentExpense._sum.amount || 0);
    return totalSpendings;
  }),
  departementsExpenses: protectedProcedure.query(async ({ ctx }) => {
    const totalExpensesResult = await ctx.db.expenses.aggregate({
      _sum: {
        amount: true,
      },
      where: { organizationId: ctx.session.user.organizationId },
    });
    const totalExpenses = totalExpensesResult._sum.amount || 0;
    const departmentsExpenses = await ctx.db.expenses.groupBy({
      by: ["department"],
      _sum: {
        amount: true,
      },
      where: {
        department: {
          not: null, // Exclude entries with null departments
        },
        organizationId: ctx.session.user.organizationId,
      },
    });

    return departmentsExpenses.map((dept) => {
      const totalAmount = dept._sum.amount || 0;
      const percentage = totalExpenses
        ? (totalAmount / totalExpenses) * 100
        : 0;

      return {
        department: dept.department,
        totalAmount,
        percentage: percentage.toFixed(2), // Optional: Format to 2 decimal places
      };
    });
  }),
  expencesAndRevenueForYear: protectedProcedure.query(async ({ ctx }) => {
    // for each month of the year, get the total revenue and expenses
    let monthlyData: MonthlyData[] = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(currentDate, i);
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Query total expenses for the month
      const expensesResult = await ctx.db.expenses.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: ctx.session.user.organizationId,
        },
      });

      const totalExpenses = expensesResult._sum.amount || 0;

      // Query total revenue for the month
      const revenueResult = await ctx.db.revenue.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: ctx.session.user.organizationId,
        },
      });

      const totalRevenue = revenueResult._sum.amount || 0;

      // Add to the monthly data
      monthlyData.push({
        month: startDate.getMonth() + 1, // Get month number (1-12)
        year: startDate.getFullYear(), // Get the year
        totalRevenue,
        totalExpenses,
      });
    }

    return monthlyData;
  }),
  lastSixMonthInvestements: protectedProcedure.query(async ({ ctx }) => {
    const investmentData: InvestmentData[] = [];
    const currentDate = new Date();

    // Loop through the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(currentDate, i);
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Query total investments for the month
      const investmentsResult = await ctx.db.investments.aggregate({
        _sum: {
          investment_amount: true,
        },
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: ctx.session.user.organizationId,
        },
      });

      const totalInvestment = investmentsResult._sum.investment_amount || 0;

      // Add to the investment data
      investmentData.push({
        month: startDate.getMonth() + 1, // Get month number (1-12)
        year: startDate.getFullYear(), // Get the year
        totalInvestment,
      });
    }

    return investmentData;
  }),
  lastSixMonthDebts: protectedProcedure.query(async ({ ctx }) => {
    const debtData: DebtData[] = [];
    const currentDate = new Date();

    // Loop through the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(currentDate, i);
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Query total debts for the month
      const debtsResult = await ctx.db.debt.aggregate({
        _sum: {
          principal: true,
        },
        where: {
          maturity_date: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: ctx.session.user.organizationId,
        },
      });

      const totalDebt = debtsResult._sum.principal || 0;

      // Add to the debt data
      debtData.push({
        month: startDate.getMonth() + 1, // Get month number (1-12)
        year: startDate.getFullYear(), // Get the year
        totalDebt,
      });
    }

    return debtData;
  }),
});
