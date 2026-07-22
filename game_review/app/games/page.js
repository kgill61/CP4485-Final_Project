import CardList from "./gameList";
import { cookies } from 'next/headers'
import { connectToDB } from "../database/db";

async function getGames() {
  try {
    const res = await fetch("http://localhost:3000/api/games", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API error:", res.status);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
}


export default async function GamesPage() {
  let games = await getGames();

  const cookie = await cookies();
  const login = cookie.get('login');
  // Get the users name, from the cookie. Needs to be a backend request to avoid decrypting on the client side
  let userName = ""
  let admin = false
  if (login) {
    try {
      const res = await fetch("http://localhost:3000/api/username", {
        cache: "no-store",
        headers: {
          Cookie: cookie.toString() 
    }
      });
      const userData = await res.json();
      userName = userData.email?.trim().toLowerCase(); //.email fixes this, now it correctly extracts the email
  
      // Check if the user is an admin in our database. For eric's purpose, it adds everyone as not an admin, and we have to change the database ourselves to make someone and admin. If you need to check what it looks like, email one of us. But it looks exactly like part 2 did with the CRUD buttons.
      const { db } = await connectToDB();
      const user = await await db.collection("users").findOne({ email: userName });
      admin = user?.admin ?? false; //This change fixes admin detection
  
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }
  // TODO: Not a huge fan of how I coded this, as iterating over every game to ensure admin exists is not going to scale well. Should rewrite this somehow before the final project submission.
  games.map((game) => 
    game.admin = admin
  )

  return (
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-6xl">

        <div className="border-b border-slate-800 pb-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Game Library
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Browse our collection of reviewed games.
          </p>
        </div>

        {/* Render games from MongoDB */}
        <CardList games={games} />

        {/* Your CRUD buttons */}
        {
          admin &&
          <p className="text-slate-400 mt-4 text-lg">User settings:</p>
        } { 
          admin &&
          <div className="flex flex-row gap-4 p-2">
            <a href="/create"><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">Create New Game</button></a>
            <a href="/read"><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">View Game data</button></a>
          </div>
        }

      </div>
    </div>
  );
}
