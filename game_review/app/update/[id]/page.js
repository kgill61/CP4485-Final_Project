import { connectToDB } from "../../database/db";
import { redirect } from 'next/navigation'

export default async function UpdatePage({params}) {
  let id = await params;

  async function handleUpdate(formData) {
    "use server";
    const { db } = await connectToDB();

    await db.collection("gameLibrary").updateOne(
                {id: parseInt(id.id)},
                {$set: {
                    title: formData.get("title"),
                    description: formData.get("description"),
                    image: formData.get("image")
                }})

    redirect("/games");
  };


  const {db} = await connectToDB();
  
  let game = await db.collection('gameLibrary').findOne({id: parseInt(id.id)})
  console.log(game);

  return (
  <div style={{ padding: 20 }}>
    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Update a Game</h1>

    <div className="bg-slate-800 text-white placeholder-slate-400 px-2 py-1 rounded border border-slate-500 w-52 shadow-inner mb-4">
      <form action={handleUpdate}>
        <input name="title" defaultValue= {game.title} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <textarea defaultValue={game.description} name="description" className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <input defaultValue={game.image} name="image" className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />
        <button className="bg-white font-bold text-black px-3 py-2 rounded shadow hover:bg-gray-100 w-35" type="submit">Update</button>
      </form>
    </div>

  </div>

  );
}
