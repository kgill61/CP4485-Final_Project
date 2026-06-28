import { connectToDB } from "../../database/db";
import { redirect } from 'next/navigation'

export default async function DeletePage({params}) {
  let id = await params;

  async function handleDelete() {
    "use server";
    const { db } = await connectToDB();
    console.log(id.id)
    await db.collection("gameLibrary").deleteOne(
                {id: parseInt(id.id)}
    )

    redirect("/games");
  };


  const {db} = await connectToDB();
  
  let game = await db.collection('gameLibrary').findOne({id: parseInt(id.id)})
  console.log(game);

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Delete a Game</h1>

      <form action={handleDelete} className="flex flex-col gap-3 mt-2">
        <button className="bg-white font-bold text-black px-3 py-1 rounded shadow hover:bg-gray-100 w-32" type="submit">Delete</button>
      </form>

    </div>
  );
}
