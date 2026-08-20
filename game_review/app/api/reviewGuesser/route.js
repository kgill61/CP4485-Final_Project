import { connectToDB } from "../../database/db";

export async function GET() {
  try {
    const { db } = await connectToDB();

    // Gets a random review using MongoDB $sample
    const randomReview = await db.collection("reviews")
      .aggregate([
        { $sample: { size: 1 } },
        {
          $lookup: {
            from: "gameLibrary",
            localField: "gameId",
            foreignField: "id",
            as: "gameInfo"
          }
        },
        { $unwind: "$gameInfo" }
      ])
      .toArray();

    if (!randomReview || randomReview.length === 0) {
      return Response.json({ error: "No reviews found" }, { status: 404 });
    }

    const review = randomReview[0];

    return Response.json({
      reviewText: review.reviewText,
      gameTitle: review.gameInfo.title,    
    });
  } catch (error) {
    console.error("Error fetching random review:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
