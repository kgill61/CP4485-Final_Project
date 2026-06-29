import { connectToDB } from "../../../database/db";

export async function PATCH (
        request
    ) {
    const body = await request.json();
    try {
        const { db } = await connectToDB();
        let query = {id: body.id}
        console.log(body);
        console.log("=============")
        console.log(body.updates);
        const exists = await db.collection("gameLibrary").findOne(query);
        if (!exists) {
            // Gather the information. Updating everything as we may want to remove some parts of content instead of replace it.
            const name = body.updates.title;
            const desc = body.updates.description;
            const img = body.updates.image;
            console.log(name, " : ", desc, " : ", img);
            // grab and update the game if the id exists
            /*const result = await db.collection("gameLibrary").updateOne(
                {id: body.updates.id},
                {$set: {
                    title: name,
                    description: desc,
                    image: img
                }}
            );*/
            return Response.json({message: `Game Updated: ${body.updates.title}`, worked: true});
        }
        // otherwise, return an error and don't add.
        return Response.json({message: "GAME DOESN'T EXIST", worked: false});
      } catch (error) {
        console.error("Error updating game:", error);
        return Response.json({ error: "Failed to update game"}, { status: 500 });
      }
}