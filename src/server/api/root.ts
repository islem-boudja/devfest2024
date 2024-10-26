import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { organizationRouter } from "./routers/organization";
import { inviteRouter } from "./routers/invite";
import { settingsRouter } from "./routers/settings";
import { dashboardRouter } from "./routers/dashbord";
import { expensesRouter } from "./routers/expenses";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  invite: inviteRouter,
  settings: settingsRouter,
  dashboard: dashboardRouter,
  expenses: expensesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
