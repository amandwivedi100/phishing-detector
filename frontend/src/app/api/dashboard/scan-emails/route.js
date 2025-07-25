export async function POST(req) {
  try {
    const { emails } = await req.json();

    console.log("🚀 Sending to backend:", { payload: emails });

    // Send it to Express
    const response = await fetch(
      "http://localhost:8000/dashboard/scan-emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: emails,
        }),
      }
    );

    const result = await response.json(); // ✅ THIS is correct now

    console.log("🔥 Got this from backend:", result); // 💥 PUT THIS LINE HERE

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("❌ Error sending emails to backend:", error);
    return new Response(JSON.stringify({ error: "Failed to forward emails" }), {
      status: 500,
    });
  }
}
