import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EmailList from "@/app/components/EmailList";
import Link from "next/link"; // 💡 add this at the top

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        <p className="text-lg">Access denied. Go login, bruh.</p>
      </div>
    );
  }

  const emails = await fetchEmails(session.accessToken);

  await fetch("http://localhost:3000/api/dashboard/scan-emails", {
    method: "POST",
    headers: {
      Content_Type: "application/json",
    },
    body: JSON.stringify({ emails }),
  });

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {session.user.name} 👋
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse bg-zinc-800">
          <thead>
            <tr className="bg-zinc-700 text-left text-sm uppercase text-gray-400">
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Snippet</th>
              <th className="px-6 py-3">Message ID</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr
                key={email.id}
                className="border-b border-zinc-700 hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  <Link href={`/email/${email.id}`} className="hover:underline">
                    {email.subject}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <Link href={`/email/${email.id}`} className="hover:underline">
                    {email.snippet}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{email.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function fetchEmails(accessToken) {
  const res = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  const messages = data.messages || [];

  const detailedMessages = await Promise.all(
    messages.map(async (msg) => {
      const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const detail = await res.json();

      const subjectHeader = detail.payload.headers.find(
        (h) => h.name === "Subject"
      );

      return {
        id: msg.id,
        subject: subjectHeader?.value || "(No Subject)",
        snippet: detail.snippet,
      };
    })
  );

  return detailedMessages;
}
