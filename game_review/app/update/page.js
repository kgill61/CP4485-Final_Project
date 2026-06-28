"use client";

import { useState } from "react";

export default function UpdatePage() {
  const [id, setId] = useState("");
  const [updates, setUpdates] = useState({ title: "", description: "" });

  async function handleUpdate(e) {
    e.preventDefault();

    await fetch("/api/games/update", {
      method: "PUT",
      body: JSON.stringify({ id, ...updates }),
    });

    alert("Game updated!");
  }

  return (
  <div style={{ padding: 20 }}>
    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Update a Game</h1>

    <div className="bg-slate-800 text-white placeholder-slate-400 px-2 py-1 rounded border border-slate-500 w-52 shadow-inner mb-4">
      <form onSubmit={handleUpdate}>
        <input placeholder="Game ID" onChange={(e) => setId(e.target.value)} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <input placeholder="New Title" onChange={(e) => setUpdates({ ...updates, title: e.target.value })} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <textarea placeholder="New Description" onChange={(e) => setUpdates({ ...updates, description: e.target.value })} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />
      </form>
    </div>

    <button className="bg-white font-bold text-black px-3 py-2 rounded shadow hover:bg-gray-100 w-35" type="submit" onClick={handleUpdate}>Update</button>
  </div>

  );
}
