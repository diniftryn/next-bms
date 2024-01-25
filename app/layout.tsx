import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Management System",
  description: "An app to book and manage your classes easily."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body>
        <nav>
          {!!session &&
          <span>
            Logout
          </span>
            }
            {!session && 
            <Link href='/login'>
            Login
            </Link>}
        </nav>
        {children}
      </body>
      <Toaster />
    </html>
  );
}
