import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/server/db/client";
import { router, publicProcedure } from "../trpc";
import * as bcrypt from "bcryptjs";

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().nullish(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { username, email, password } = input;
      console.log(username);
      const saltRounds = 10;

      if (!username || !email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "All fields are mandatory",
        });
      }

      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      if (!regex.test(password)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        });
      }

      const userToCheck = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      });

      if (userToCheck) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const createdUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return {
        message: "User created",
        success: true,
        email: createdUser.email,
      };
    }),
});

/*
 */
