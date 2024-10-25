import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import SignInButton from "~/app/_components/invite-button";
import { api } from "~/trpc/server";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { invite?: string };
}) {
  const session = await getServerAuthSession();
  const inviteToken = searchParams.invite;

  if (session?.user?.organizationId) {
    redirect("/dashboard");
  }

  if (session && inviteToken) {
    const addManager = await api.organization.addManager({
      userId: session?.user?.id,
      token: inviteToken,
    });
    console.log("addManager: ", addManager);
    redirect("/dashboard");
  }

  const callbackUrl = `/invite?invite=${inviteToken}`;

  return (
    <div className="mx-auto max-w-md p-6">
      {inviteToken && session && (
        <div className="mb-4 rounded-md bg-blue-50 p-3 text-blue-700">
          You are being linked to an org
        </div>
      )}
      <h1 className="mb-6 text-2xl font-bold">Sign In</h1>

      {inviteToken && (
        <div className="mb-4 rounded-md bg-blue-50 p-3 text-blue-700">
          You ve been invited to join an organization
        </div>
      )}

      <SignInButton callbackurl={callbackUrl} />
    </div>
  );
}
