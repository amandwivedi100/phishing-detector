// app/api/dashboard/scan-emails/route.js

export async function POST(req) {
  try {
    const { emails } = await req.json();

    // 🔥 Send it to the Express AI backend
    const res = await fetch("http://localhost:8000/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: emails }),
    });

    const result = await res.json();

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("Error sending emails to backend:", error);
    return new Response(JSON.stringify({ error: "Failed to forward emails" }), {
      status: 500,
    });
  }
}
