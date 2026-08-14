import { cookies } from "next/headers";
import { connectToDB } from "../../../database/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { gameId, reviewText, rating } = body;

    if (!gameId || !reviewText) {
      return Response.json({ worked: false, message: "Missing required fields" });
    }

    const { db } = await connectToDB();
    const cookieStore = await cookies();
    const cookieHeader = (await cookieStore.getAll())
      .map(c => `${c.name}=${c.value}`)
      .join("; ");

    // Fetch the user email from your username API
    const res = await fetch("http://localhost:3000/api/username", {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
    });
    const userData = await res.json();
    const userEmail = userData.email;

    // Store the review using the email
    await db.collection("reviews").insertOne({
      gameId: parseInt(gameId),
      reviewText,
      rating: parseInt(rating),
      user: userEmail,
      createdAt: new Date(),
    });

    return Response.json({ worked: true });
  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ worked: false, message: "Server error" });
  }
}
