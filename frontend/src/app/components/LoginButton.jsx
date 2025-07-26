"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-300">
          Logged in as {session.user?.email}
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-3 w-[300px] bg-black text-white font-semibold py-3 rounded-lg hover:bg-zinc-900 transition duration-200
      border border-zinc-800"
    >
      <img src="/google.png" alt="Google" className="w-9 h-7" />
      Login with Google
    </button>
  );
}
