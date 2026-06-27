import { connectToDB } from "../../database/db";

export async function GET() {
  try {
    const { db } = await connectToDB();
    const games = await db.collection("gameLibrary").find().toArray();
    return Response.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return Response.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
