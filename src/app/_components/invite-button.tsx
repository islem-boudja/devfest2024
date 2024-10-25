"use client";

import { signIn } from "next-auth/react";

export default function SignInButton({ callbackurl }: { callbackurl: string }) {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: callbackurl,
        })
      }
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        {/* Add Google icon SVG here */}
      </svg>
      Sign in with Google
    </button>
  );
}
