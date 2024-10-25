import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Welcome, {session.user.name}
        </h2>
        <div className="space-y-2">
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
          <p>Organization ID: {session.user.organizationId}</p>
        </div>
      </div>
    </div>
  );
}
