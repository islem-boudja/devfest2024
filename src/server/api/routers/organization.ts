/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  addManager: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        token: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const invite = await ctx.db.inviteLink.findUnique({
        where: {
          token: input.token,
        },
        include: {
          organization: true,
        },
      });

      if (!invite) {
        throw new Error("Invalid invite token");
      }

      Promise.all([
        ctx.db.organization.update({
          where: {
            id: invite.organizationId,
          },
          data: {
            managers: {
              connect: {
                id: input.userId,
              },
            },
          },
        }),
        ctx.db.inviteLink.delete({
          where: {
            id: invite.id,
          },
        }),
        ctx.db.user.update({
          where: {
            id: input.userId,
          },
          data: {
            role: "MANAGER",
          },
        }),
      ]);

      return {
        msg: "User added as manager",
      };
    }),
});
