import { cookies } from "next/headers";
import { connectToDB } from "../../../database/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { gameId, reviewText, rating } = body;

    if (!gameId || !reviewText) {
      return Response.json({ worked: false, message: "Missing required fields" });
    }
    //Variables
    const { db } = await connectToDB();
    const cookie = await  cookies();
    const login = cookie.get("login")?.value;
    // Stores the review
    await db.collection("reviews").insertOne({
      gameId: parseInt(gameId),
      reviewText,
      rating: parseInt(rating),
      user: login,
      createdAt: new Date(),
    });

    return Response.json({ worked: true });
  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ worked: false, message: "Server error" });
  }
}
