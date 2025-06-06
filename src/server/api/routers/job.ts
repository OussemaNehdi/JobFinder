import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  //Search external API (I tried using starWars API at first but it is currently down)
  search: publicProcedure
    .input(z.object({ keyword: z.string().min(1) }))
    .query(async ({ input }) => {
      const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const data = await res.json();

      const results = data.data
        .filter((job: any) =>
          job.title.toLowerCase().includes(input.keyword.toLowerCase())
        )
        .slice(0, 10) // only first 10 (I used this because the API returns a lot of results).

        .map((job: any) => ({
          title: job.title,
          companyName: job.company_name,
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
