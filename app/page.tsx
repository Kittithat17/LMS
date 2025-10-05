"use client";
import Link from "next/link";
import React, { use } from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Homepage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Successfully signed out");
        },
      },
    });
  }

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.email}</h1>
        <Link href="/login">Go to Dashboard</Link>
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div>
      <Link href="/login">login</Link>
    </div>
  );
}
