import { cookies } from "next/headers";
import { connectToDB } from "../../database/db";
import { recommendGames } from "../../lib/ai/recommendGames.js";
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = (await cookieStore.getAll())
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    // Fetch user email from your username API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/username`, {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
    });

    const userData = await res.json();
    const userEmail = userData.email; // Defines the userEmail before using it

    // Pass the email to the recommendation function
    try {
      const aiResult = await recommendGames(userEmail);
      return Response.json(aiResult);
    } catch (error) {
      if (error.message.includes("No reviews found")) {
        return Response.json(
          { error: "No reviews found", message: "Please write a review first!" },
          { status: 400 }
        );
      }
      console.error("AI route failed:", error);
      return Response.json({ error: "Server error" }, { status: 502 });
    }
  } catch (error) {
    console.error("Outer route error:", error);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
