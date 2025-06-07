import { jobRouter } from "./routers/job";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  job: jobRouter,
});

export type AppRouter = typeof appRouter