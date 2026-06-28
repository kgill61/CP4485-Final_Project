import { connectToDB } from "../../../database/db";

export async function POST(request) {
    const body = await request.json();
    try {
        const { db } = await connectToDB();
        // Check if it is a duplicate?
        let query = {title: body.title}
        console.log(body)
        const exists = await db.collection("gameLibrary").findOne(query);
        if (!exists) {
            // grab the last game as an array (Probably a more efficient way to do this)
            const games = await db.collection("gameLibrary").find().sort({ _id: -1 }).limit(1).toArray();
            // Parse into an object itself
            const lastItem = games.at(-1);
            // make the current id 1 more.
            body.id = parseInt(lastItem.id) + 1;
            // Attempt adding the game
            const result = await db.collection("gameLibrary").insertOne(body);
            return Response.json({message: `Game Added: ${body.title}`, worked: true});
        }
        // otherwise, return an error and don't add.
        return Response.json({message: "GAME ALREADY EXISTS", worked: false});
      } catch (error) {
        console.error("Error adding games:", error);
        return Response.json({ error: "Failed to add games"}, { status: 500 });
      }
}