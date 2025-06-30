// app/api/reload/route.ts
import axios from "axios";

export async function POST() {
  try {
    const response = await axios.post(
      `${process.env.HUGGING_FACE_API_URL}/reload`,
      "", // ❗ send an empty string, not {}
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          Accept: "application/json", // matches curl
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    let message = "Failed to reload chatbot data.";
    if (axios.isAxiosError(error)) {
      console.error("Reload API Error:", error.message);
      message = error.message;
    } else {
      console.error("Unexpected error", error);
    }

    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
