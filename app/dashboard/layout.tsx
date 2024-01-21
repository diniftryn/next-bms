import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Logout from "../logout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <section>
      Menu
      <Logout />
      {children}
    </section>
  );
}
