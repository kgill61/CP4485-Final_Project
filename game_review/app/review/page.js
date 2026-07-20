"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ReviewPage() {
  //Variables
  const [form, setForm] = useState({ gameId: "", reviewText: "", rating: 0 });
  const [warn, setWarn] = useState("");
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  console.log("Game ID from URL:", gameId);

  //Adds game id to the review form area automatically
  useEffect(() => {
    if (gameId) {
      setForm((prev) => ({ ...prev, gameId }));
    }
    }, [gameId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form);

    const response = await fetch("/api/review/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const res = await response.json();
    if (!res.worked) {
      setWarn(res.message);
    } else {
      setWarn("");
      redirect(`/games/gameDisplay/${form.gameId}`);
    }
  }

  return (
    <div className="flex flex-col items-center p-6 md:p-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-6">
        Write a Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 text-white placeholder-slate-400 px-4 py-6 rounded border border-slate-500 w-full max-w-lg shadow-inner"
      >
        <input
          placeholder="Game ID"
          name="gameId"
          value={form.gameId}
          onChange={handleChange}
          className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-2 rounded outline-none mb-4"
        />

        <textarea
          placeholder="Write your review..."
          name="reviewText"
          value={form.reviewText}
          onChange={handleChange}
          className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-2 rounded outline-none mb-4"
          rows="5"
        />

        <label className="block mb-2 text-slate-300">Rating (0–5 stars)</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          value={form.rating}
          onChange={handleChange}
          className="bg-transparent text-white placeholder-slate-400 w-full px-2 py-2 rounded outline-none mb-4"
        />

        <div className="text-red-500 font-bold mb-4">{warn}</div>

        <button
          type="submit"
          className="bg-white font-bold text-black px-3 py-2 rounded shadow hover:bg-gray-100 w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
