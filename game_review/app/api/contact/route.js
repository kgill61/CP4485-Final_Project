export async function POST(request) {
    const body = await request.json();
    //Might be redundent, cant see it in dev tools
    console.log("Received:", body);
    
    let string = `From ${body.name} (${body.email})\n Subject: ${body.sbj}\nMessage: ${body.msg}`;

    return Response.json({ message: string});
}
