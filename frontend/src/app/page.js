import LoginButton from "./components/LoginButton";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Welcome to the gmail snatcher app</h2>
      <LoginButton />
      <Link href="/dashboard">Check Your Emails</Link>
    </main>
  );
}
