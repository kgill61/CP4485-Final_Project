import { connectToDB } from "../../database/db";

export async function POST(request) {
    const body = await request.json();
    //Might be redundent, cant see it in dev tools
    console.log("Received:", body);
    
    let string = `From ${body.name} (${body.email})\n Subject: ${body.sbj}\nMessage: ${body.msg}`;

    // This section is mostly just to make this contact section not pointless, no other functionality will be added to this as of now. The Game database is the main focus for this section of the project.
    try {
        const { db } = await connectToDB();
        // Attempt adding the game
        const result = await db.collection("userContactInfo").insertOne(body);
        return Response.json({message: `Contact Added: ${body}`, worked: true});
    } catch (error) {
        console.error("Error adding contact:", error);
        return Response.json({ error: "Failed to add contact"}, { status: 500 });
    }
}
