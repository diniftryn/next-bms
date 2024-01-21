import { getServerSession } from "next-auth";
import Login from "./login/page";
import Dashboard from "./dashboard/page";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="h-screen w-full flex justify-center item">
      {!session && <Login />}
      {session && <Dashboard />}
    </main>
  );
}
