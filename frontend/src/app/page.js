"use client";
import { useSession } from "next-auth/react";
import LoginButton from "./components/LoginButton";
import Link from "next/link";
import { Khand, M_PLUS_Code_Latin } from "next/font/google";

const khand = Khand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-khand",
});

const mplus = M_PLUS_Code_Latin({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-mplus",
});

export default function Home() {
  const { data: session } = useSession(); // 💥 get session

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center text-white bg-black overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src="/background1.png"
        alt="Background"
        className="absolute inset-0 w-screen h-screen object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0)] z-10" />

      {/* Center wrapper */}
      <div className="relative z-20 flex flex-col items-center px-4">
        {/* Logo */}
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-28 h-28 object-contain mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]"
        />

        {/* Login Box */}
        <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.7)] p-10 max-w-md w-full text-center">
          {/* Welcome Text */}
          <h1
            className="text-4xl mb-4 
             text-[#ffffff]"
            style={{ fontFamily: "var(--font-mplus)" }}
          >
            Welcome!
          </h1>

          <LoginButton />

          {/* Only show this when logged in */}
          {session && (
            <Link
              href="/dashboard"
              className="mt-6 inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
            >
              Check Your Emails
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
