import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import SignInButton from "~/app/_components/invite-button";
import { api } from "~/trpc/server";
import { env } from "~/env";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { invite?: string };
}) {
  const session = await getServerAuthSession();
  const inviteToken = searchParams.invite;

  // If the user is already logged in and part of an organization, redirect to the dashboard
  if (session && session.user.organizationId) {
    redirect("/dashboard");
  }

  // Check if an invite token exists and the user is logged in
  if (session && inviteToken) {
    // Fetch the role associated with the invite token
    const inviteRoleResponse = await api.invite.getInviteTokenRole({
      token: inviteToken,
    });

    if (!inviteRoleResponse.success) {
      // If the token is invalid, redirect to a generic error or home page
      redirect("/invalid-invite");
    }
    if (inviteRoleResponse.data === "USER") {
         await api.organization.addEmployee( 
            {
                userId: session.user.id,
                token: inviteToken,
              }
        )
      // If the role is USER, redirect to the dashboard
      redirect("/dashboard");
    } 
     if (inviteRoleResponse.data === "MANAGER") {
    // Add the user to the organization based on the role retrieved
    const addManager = await api.organization.addManager({
      userId: session.user.id,
      token: inviteToken,
    });

    console.log(addManager);
    redirect("/dashboard");
  }
}
  // Set up callback URL for redirecting after sign-in
  let callbackurl = `${env.NEXTAUTH_URL}/create-organization`;
  if (inviteToken) {
    callbackurl = `${env.NEXTAUTH_URL}/organization/invite?invite=${inviteToken}`;
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
      {inviteToken && (
        <div className="mb-4 rounded-md bg-blue-50 p-3 text-blue-700">
          You've been invited to join an organization
        </div>
      )}
      <SignInButton callbackurl={callbackurl} />
    </div>
  );
}
