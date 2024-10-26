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
            organizationId: invite.organizationId,
          },
        }),
      ]);

      return {
        msg: "User added as manager",
      };
    }),
    addEmployee : protectedProcedure
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
            role: "USER",
            organizationId: invite.organizationId,
          },
        }),
      ]);

      return {
        msg: "User added as manager",
      };
    }), 
  createOrganization: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const organization = await ctx.db.organization.create({
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
        },
      });

      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: "OWNER",
          organizationId: organization.id,
        },
      });
      return organization;
    }),
});
