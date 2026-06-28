import CardList from "./gameList";

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
  const games = await getGames();

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
        <p className="text-slate-400 mt-4 text-lg">User settings:</p>
        <div className="flex flex-row gap-4 p-2">
          <a href="/create"><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">Create New Game</button></a>
          <a href="/read"><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">View Game data</button></a>
          <a href="/delete"><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">Delete a Game</button></a>
        </div>

      </div>
    </div>
  );
}
