import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EmailPage({ params }) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return <p className="text-white">You ain't logged in, bro 🚫</p>;
  }

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  const subject =
    data.payload.headers.find((h) => h.name === "Subject")?.value ||
    "(No Subject)";
  const from =
    data.payload.headers.find((h) => h.name === "From")?.value || "Unknown";

  const body =
    data.payload.parts?.[0]?.body?.data ||
    data.payload.body?.data ||
    "No content available";

  const decodedBody = Buffer.from(body, "base64").toString("utf-8");

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-2">{subject}</h1>
      <p className="text-sm text-gray-400 mb-6">From: {from}</p>
      <div className="whitespace-pre-wrap bg-zinc-800 p-6 rounded shadow">
        {decodedBody}
      </div>
    </div>
  );
}
