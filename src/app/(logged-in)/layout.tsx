import Sidebar from "~/components/layout/Sidebar";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full gap-x-3 bg-[#EBEDF1]">
      <Sidebar />
      <div className="h-screen w-full overflow-auto p-4 px-8">{children}</div>
    </div>
  );
}
