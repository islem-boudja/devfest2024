/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";
export async function createInviteLink(organizationId: string, email: string) {
  const token = crypto.randomUUID();
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // Expires in 7 days

  const invite = await db.inviteLink.create({
    data: {
      organizationId,
      email,
      token,
      expires,
    },
  });

  return `${process.env.NEXTAUTH_URL}/auth/signin?invite=${invite.token}`;
}
