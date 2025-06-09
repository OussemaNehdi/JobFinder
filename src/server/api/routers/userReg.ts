import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";


export const userRegRouter = createTRPCRouter({
    saveUser: publicProcedure
        .input(
        z.object({
            email: z.string().email(),
            password: z.string().min(1),
        })
        )
        .mutation(async ({ ctx, input }) => {
        try {
            // Check if user already exists
            const existing = await ctx.db.user.findUnique({ where: { email: input.email } });
            if (existing) {
            return { success: false, message: "Email already registered" };
            }
            // Hash the password
            const hashed = await bcrypt.hash(input.password, 10);
            await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashed,
            },
            });
            return { success: true, message: "User registered successfully" };
        } catch (error: any) {
            return { success: false, message: "Registration failed" };
        }
        }),

});
