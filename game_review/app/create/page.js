"use client";

import { redirect } from 'next/navigation'
import { useState } from "react";

export default function CreatePage() {
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [warn, setWarn] = useState("");

  const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form)
    const response = await fetch("/api/games/create", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const res = await response.json();
    if (!res.worked) {
      setWarn(res.message);
    } else {
      setWarn("");
    }
    console.log(res);
    
    redirect("/games");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Create a New Game</h1>

    <div className="bg-slate-800 text-white placeholder-slate-400 px-2 py-1 rounded border border-slate-500 w-52 shadow-inner mb-4">
      <form onSubmit={handleSubmit}><input placeholder="Title" name="title"  value={form.title} onChange={handleChange} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
      <br />
        <textarea placeholder="Description" name="description"  value={form.description} onChange={handleChange} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />

        <input placeholder="Image URL" value={form.image} name="image" onChange={handleChange} className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-1 rounded outline-none"/>
        <br />
      </form>
    </div>

    <div className="text-red font-bold">{warn}</div>

    <button className="bg-white font-bold text-black px-3 py-2 rounded shadow hover:bg-gray-100 w-35" type="submit" onClick={handleSubmit}>Create</button>
  </div>
  );
}
