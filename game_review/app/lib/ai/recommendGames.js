import "server-only";
import { connectToDB } from "../../database/db";
import { gameCount } from "./gameSchema";
import {
  generateText,
  NoObjectGeneratedError,
  Output,
} from "ai";
import { groqModels } from "./groqModels";
import { gameSchema } from "./gameSchema.js";

const sysPrompt = `
You are recommending games for a user to try.

Based on the given list of games and their ratings, recommend ${gameCount} games for the user to try.

Rules:
1. Must be a real, already released game.
2. Give the proper information on each of the games.
`.trim();

// Add userEmail as a parameter here
export async function recommendGames(userEmail) {
  console.log("Rec happens for email:", userEmail);

  try {
    const { db } = await connectToDB();
    console.log("Connected to DB");

    // Use the parameter directly
    const reviews = await db.collection("reviews").find({ user: userEmail }).toArray();
    console.log("Fetched reviews:", reviews);

    if (!reviews || reviews.length === 0) {
      console.warn("No reviews found for this user.");
      throw new Error("No reviews found for this user.");
    }

    // Fetch game titles for each review
    const reviewedGames = await Promise.all(
      reviews.map(async r => {
        const game = await db.collection("gameLibrary").findOne({ id: r.gameId });
        return {
          name: game?.title || `Game ID ${r.gameId}`,
          rating: r.rating,
        };
      })
    );


    console.log("Reviewed games formatted:", reviewedGames);

    const reviewedList = reviewedGames
      .map(g => `${g.name} (rating: ${g.rating})`)
      .join(", ");
    console.log("Prompt built:", reviewedList);

    const result = await generateText({
      model: groqModels("openai/gpt-oss-20b"),
      system: sysPrompt,
      prompt: `The user has played and reviewed these games: [${reviewedList}]. Recommend ${gameCount} games they might enjoy based on these reviews.`,
      output: Output.object({
        name: "gameRecs",
        description: "Game recommendations",
        schema: gameSchema,
      }),
      maxRetries: 1,
      providerOptions: { groq: { reasoningEffort: "low" } },
      maxOutputTokens: 2500,
    });

    console.log("AI result:", result);
    return result.output;
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.error("Response does not meet standards.", {
        cause: error.cause,
        text: error.text,
        usage: error.usage,
      });
      throw new Error("The AI did not respond with the correct standards.");
    }

    console.error("recommendGames() failed:", error);
    throw error;
  }
}
