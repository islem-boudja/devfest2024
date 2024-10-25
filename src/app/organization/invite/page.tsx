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

  if (session && session.user.organizationId) {
  }
  let callbackurl;
  if (session && inviteToken) {
    const addManager = await api.organization.addManager({
      userId: session.user.id,
      token: inviteToken,
    });
    console.log(addManager);
    redirect("/dashboard");
  }
  if (inviteToken) {
    callbackurl = `${env.NEXTAUTH_URL}/organization/invite?invite=${inviteToken}`;
  }
  callbackurl = `${env.NEXTAUTH_URL}/create-organization`;
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Sign In</h1>

      {inviteToken && (
        <div className="mb-4 rounded-md bg-blue-50 p-3 text-blue-700">
          You ve been invited to join an organization
        </div>
      )}

      <SignInButton callbackurl={callbackurl} />
    </div>
  );
}
