import { getServerSession } from "next-auth";
import SignUpForm from "./signup-form";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <SignUpForm />;
}
