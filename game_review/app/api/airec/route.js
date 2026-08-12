import { cookies } from "next/headers";
import { connectToDB } from "../../database/db";
import { recommendGames } from "../../lib/ai/recommendGames.js";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = (await cookieStore.getAll())
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    // Fetch user email from your username API
    const res = await fetch("http://localhost:3000/api/username", {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
    });

    const userData = await res.json();
    const userEmail = userData.email; // ✅ define userEmail before using it

    // Pass the email to the recommendation function
    const aiResult = await recommendGames(userEmail);
    return Response.json(aiResult);
  } catch (error) {
    console.error("AI route failed:", error);
    return Response.json({ error: "Server error" }, { status: 502 });
  }
}