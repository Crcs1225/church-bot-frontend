// app/api/chat/route.ts
import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.HUGGING_FACE_API_URL}/chat`, // ❗ Potential problem here
      { message: body.message }, // ✅ matches your backend
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    let message = "Failed to connect to chatbot backend.";

    if (axios.isAxiosError(error)) {
      console.error("Chat API Error:", error.message);
      message = error.message;
    } else {
      console.error("Unexpected error", error);
    }

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}
