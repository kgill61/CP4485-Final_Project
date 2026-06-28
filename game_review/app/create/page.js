"use client";

import { useState } from "react";

export default function CreatePage() {
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/games/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    alert("Game created!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Create a New Game</h1>

    <div className="bg-slate-800 text-white placeholder-slate-400 px-2 py-1 rounded border border-slate-500 w-52 shadow-inner mb-4">
      <form onSubmit={handleSubmit}><input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
      <br />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <input placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />
      </form>
    </div>

    <button className="bg-white font-bold text-black px-3 py-2 rounded shadow hover:bg-gray-100 w-35" type="submit" onClick={handleSubmit}>Create</button>
  </div>
  );
}
