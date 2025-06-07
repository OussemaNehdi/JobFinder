import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type Job = {
  title: string;
  companyName: string;
  url: string;
};

type JobApiResponse = {
  data: Job[];
};

// Add a Zod schema for the API response
const JobApiResponseSchema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      companyName: z.string(),
      url: z.string(),
    })
  ),
});

export const jobRouter = createTRPCRouter({
  //Search external API (I tried using starWars API at first but it is currently down)
  search: publicProcedure
    .input(z.object({ keyword: z.string().min(1) }))
    .query(async ({ input }) => {
      const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const json: unknown = await res.json();
      const data = JobApiResponseSchema.parse(json);

      const results = data.data
        .filter((job) =>
          job.title.toLowerCase().includes(input.keyword.toLowerCase())
        )
        .slice(0, 10)
        .map((job) => ({
          title: job.title,
          companyName: job.companyName,
          url: job.url,
        }));

      return results;
    }),

  //Save job
  save: publicProcedure
    .input(
      z.object({
        title: z.string(),
        companyName: z.string(),
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.job.create({ data: input });
    }),

  //Get all saved jobs
  getSaved: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.job.findMany({ orderBy: { createdAt: "desc" } });
  }),
});
