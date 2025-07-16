"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      session?.user?.email &&
      session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      router.push("/"); // Already signed in and not admin
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-xl font-semibold mb-4">Admin Access</h1>
      <button
        className="bg-[#6C4FF7] text-white px-6 py-2 rounded"
        onClick={() => signIn("google", { callbackUrl: "/admin/upload" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
