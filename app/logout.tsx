"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    signOut();
    toast("Successfully logged out");
    setIsLoading(false);
  }
  return <Button onClick={handleClick}>{isLoading ? <ReloadIcon /> : "Logout"}</Button>;
}
