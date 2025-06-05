import { jobRouter } from "~/server/api/routers/job";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  job: jobRouter,
});
