'use client'
import { useState } from "react";

export default function Recommend() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getRec() {
    console.log("Getting Recommendations...");
    setLoading(true);
    setError(null);

    try {
      // Ask the backend if the user is logged in
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const userRes = await fetch(`${baseUrl}/api/username`, { cache: "no-store" });
      const userData = await userRes.json();

      if (!userRes.ok || !userData.email) {
        setError("Error, please log in with an account");
        setLoading(false);
        return [];
      }

      // Proceed with recommendations
      const res = await fetch(`${baseUrl}/api/airec`, {
        method: "POST",
        cache: "no-store",
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.message) {
          setError(data.message);
        } else {
          setError(`API error: ${res.status}`);
        }
        setLoading(false);
        return [];
      }


      const data = await res.json();
      console.log("AI Response:", data);
      setRecs(data.recs || []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="p-6">
      <button
        onClick={getRec}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Get Recommendations
      </button>

      {loading && <p className="mt-4 text-gray-400">Loading recommendations...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recs.map((game, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 bg-slate-900 text-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{game.name}</h2>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-semibold">Genre:</span> {game.genre}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-semibold">Release Year:</span> {game.releaseYear}
            </p>
            <p className="text-sm text-gray-300 mb-2">{game.why}</p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Based on:</span>{" "}
              {game.basedOn?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
