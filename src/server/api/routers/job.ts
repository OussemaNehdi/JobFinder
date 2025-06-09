import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
type Job = {
  title: string;
  companyName: string;
  url: string;
};


// Add a Zod schema for the API response
const JobApiResponseSchema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      company_name: z.string(), // match API field
      url: z.string(),
    })
  ),
});

export const jobRouter = createTRPCRouter({
  // Search external API (I tried using starWars API at first but it is currently down)
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
          companyName: job.company_name, // map to camelCase
          url: job.url,
        }));

      return results;
    }),

  // Save job
  save: publicProcedure
    .input(
      z.object({
        title: z.string(),
        companyName: z.string(),
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Not authenticated");

      // Save the job to the JOB table first (if it is not saved)
      let job = await ctx.db.job.findFirst({
        where: { url: input.url },
      });
      if (!job) {
        job = await ctx.db.job.create({ data: input });
      }

      // Connect job to user
      await ctx.db.user.update({
        where: { id: Number(session.user.id) },
        data: {
          jobs: {
            connect: { id: job.id },
          },
        },
      });


      return job;
    }),

  //Get all saved jobs
  getSaved: publicProcedure.query(async ({ ctx }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");
  const user = await ctx.db.user.findUnique({
    where: { id: Number(session.user.id) },
    include: { jobs: { orderBy: { createdAt: "desc" } } },
  });
  return user?.jobs ?? [];
}),
});
