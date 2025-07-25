import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // import your auth stuff

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50, // 👈 this is the line you were asking about
    });

    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (err) {
    console.error("Failed to fetch Gmail:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Gmail", details: err }),
      { status: 500 }
    );
  }
}
