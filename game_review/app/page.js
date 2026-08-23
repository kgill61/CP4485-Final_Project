"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Import Next.js Link for routing

export default function FullScreenCarousel() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchRandomGames() {
    setLoading(true);
    try {
      const res = await fetch('/api/games/random', {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setGames(data);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Failed to load games", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandomGames();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-950 text-gray-400 text-2xl animate-pulse">
        Loading library...
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-950 text-gray-400 text-2xl">
        No games found.
      </div>
    );
  }

  const currentGame = games[currentIndex];

  return (
    // min-h-screen forces it to take up the entire height of the browser window
    <div className="w-full min-h-screen flex flex-col relative bg-gray-950 text-gray-100 overflow-hidden">
      
      {/* Main Content Area - takes up remaining space and centers items */}
      <div className="flex-1 flex justify-between items-center px-4 md:px-12 w-full max-w-screen-2xl mx-auto">
        
        {/* Previous Button */}
        <button 
          onClick={prevSlide} 
          className="p-4 md:p-6 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-all text-2xl md:text-4xl flex-shrink-0 z-10"
        >
          &#8592;
        </button>
        
        {/* Clickable Game Centerpiece */}
        {/* Uses the game's id to navigate to /games/gameDisplay/[id] */}
        <Link 
          href={`/games/gameDisplay/${currentGame.id}`} 
          className="flex-1 flex flex-col items-center justify-center text-center px-4 group cursor-pointer"
        >
          {/* Subtle scale effect on hover to indicate it's clickable */}
          <div className="transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
              {currentGame.title || "Unknown Title"}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed drop-shadow">
              {currentGame.description || "No description available."}
            </p>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-indigo-400 text-lg font-semibold tracking-widest uppercase">
              Click to view game details
            </div>
          </div>
        </Link>

        {/* Next Button */}
        <button 
          onClick={nextSlide} 
          className="p-4 md:p-6 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-all text-2xl md:text-4xl flex-shrink-0 z-10"
        >
          &#8594;
        </button>
      </div>
      
      {/* Bottom Controls - absolutely positioned at the bottom of the screen */}
      <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center gap-8 px-4 z-10">
        
        {/* Indicator Dots */}
        <div className="flex gap-3">
          {games.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-indigo-500 w-12" : "bg-gray-700 w-3 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={fetchRandomGames} 
          className="px-8 py-4 bg-indigo-600/90 hover:bg-indigo-500 text-white text-lg font-bold rounded-xl transition-colors shadow-lg backdrop-blur-sm"
        >
          Roll New Random Games
        </button>
      </div>
      
    </div>
  );
}