import { jobRouter } from "./routers/job";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  job: jobRouter,
});
