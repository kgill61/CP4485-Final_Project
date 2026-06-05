export async function POST(request) {
    const body = await request.json();
    //Might be redundent, cant see it in dev tools
    console.log("Received:", body);
    
    return Response.json({ message: "Form info acquired"});

}
