async function getGames() {
  const res = await fetch("http://localhost:3000/api/games", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ReadPage() {
  const games = await getGames();

  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">All Games raw data</h1>

      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game._id}
            className="bg-slate-800 text-white rounded-lg border border-slate-600 shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-1"> Title: {game.title}</h2>
            <p className="text-slate-300 text-med mb-2"><span className="font-medium text-slate-400">ID:</span> {game.id}</p>
            <p className="text-slate-200">Description: {game.description}</p>
            <p>Image name: {game.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
