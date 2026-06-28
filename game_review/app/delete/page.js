"use client";

import { useState } from "react";

export default function DeletePage() {
  const [id, setId] = useState("");

  async function handleDelete(e) {
    e.preventDefault();

    await fetch("/api/games/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    alert("Game deleted!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Delete a Game</h1>

      <form onSubmit={handleDelete} className="flex flex-col gap-3 mt-2">
        <input placeholder="Game ID" onChange={(e) => setId(e.target.value)} className="bg-slate-800 text-white placeholder-slate-400 px-2 py-1 rounded border border-slate-500 w-52 shadow-inner"/>
        <button className="bg-white font-bold text-black px-3 py-1 rounded shadow hover:bg-gray-100 w-32" type="submit">Delete</button>
      </form>

    </div>
  );
}
