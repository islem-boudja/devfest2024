import { z } from "zod";
import nodemailer from "nodemailer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { generateEmailHTML } from "~/utils/html-template";
import crypto from "crypto"; // Import the crypto module

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER, // your SMTP username
    pass: env.SMTP_PASS, // your SMTP password
  },
});

export const inviteRouter = createTRPCRouter({
  createInviteLink: protectedProcedure
    .input(
      z.object({
        email: z.string().email(), 
        role: z.enum(["USER", "MANAGER"]) // Replace with actual roles
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const token = crypto.randomBytes(32).toString("hex");
      try {
        const invite = await ctx.db.inviteLink.create({
          data: {
            email: input.email,
            token,
            role: input.role, 
            organizationId: ctx.session.user.organizationId,
            expires: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000,
            ).toISOString(), // Set expiration date to 7 days from now
          },
        });
        const mailOptions = {
          from: `devfest <${env.SMTP_USER}>`, // Sender address
          to: input.email, // List of receivers (comma-separated if multiple)
          subject: "Hello world", // Subject line
          html: generateEmailHTML(input.email, invite.token), // HTML content (use the same React component rendering as before)
        };
        const info = await transporter.sendMail(mailOptions);

        return { success: true, data: info };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }), 
    getInviteTokenRole : protectedProcedure.input(z.object({ 
      token : z.string()
    })).query(async ({ctx , input}) => {  
      const invite = await ctx.db.inviteLink.findFirst({ 
        where : {
          token : input.token
        }
      }); 
      if(!invite){
        return { success : false, error : "Invalid token"}
      }
      return { success : true, data : invite.role}

    })
});

