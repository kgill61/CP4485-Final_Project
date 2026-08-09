import { recommendGames } from "../../lib/ai/recommendGames.js";

export async function POST(request) {
    // Make a call to the AI model for games the user enjoyed
    // Verify the current user using cookies (username route might help get started)
    
    let aiResult;
    console.log("airoute happens")
    try {
        aiResult = await recommendGames();
    }
    catch(error) {
        console.log(error)
        return Response.json({
                error: "Recommendations weren't generated.",
            }, {
                status: 502
            })
    }
    console.log(aiResult);
    return Response.json(aiResult);
}