import "server-only"
import { gameCount } from './gameSchema';
import {
    generateText,
    NoObjectGeneratedError,
    Output,
} from 'ai';

import { groqModels } from "./groqModels";
import { gameSchema } from "./gameSchema.js";

const sysPrompt = `
        You are recommending games for a user to try.

        Based on the given list of games and their ratings, recommend ${gameCount} games for the user to try.

        Rules:
        1. Must be a real, already released game.
        2. Give the proper information on each of the games.
    `.trim()

export async function recommendGames(/* games */) {
    //console.log(games);
    // Setup getting the users reviews and give it to the AI properly

    try {
        console.log("Rec happens")
        const result = await generateText( {
            model: groqModels("openai/gpt-oss-20b"),
            system: sysPrompt,
            /* TODO: Change the prompt to use user information, like some of their reviewed games. */
            prompt: `The user has played these games: ["Batman Arkham Asylum"]`,
            output: Output.object({
                name: "gameRecs",
                description: "Game recommendations",
                schema: gameSchema,
            }),
            maxRetries: 1,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                },
            maxOutputTokens: 2500
            },
        });
        console.log(result);
        return result.output;
    }
    catch( error ) {
        if( NoObjectGeneratedError.isInstance(error)) {
            console.error("Response does not meet standards.", 
            { cause: error.cause,
              text: error.text,
              usage: error.usage,
            })
            throw new Error("The AI did not respond with the correct standards.");
        }
        throw error;
    }

}