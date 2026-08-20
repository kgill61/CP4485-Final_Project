'use client';

import { useState, useEffect } from "react";

export default function ReviewGuesser() {
  const [review, setReview] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [revealedLetters, setRevealedLetters] = useState(0);

  // Timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  // Timer countdown logic
  useEffect(() => {
    if (!timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setMessage("Time’s up!");
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive]);

  // Fetch's a random review
  async function getRandomReview() {
    const res = await fetch("/api/reviewGuesser");
    const data = await res.json();

    setReview(data);
    setMessage("");
    setGuess("");
    setRevealedLetters(1); // Start with first letter revealed

    setTimeLeft(60);
    setTimerActive(true);
  }

  // Build masked title
  function getMaskedTitle() {
    if (!review) return "";

    const title = review.gameTitle;
    const revealed = title.slice(0, revealedLetters);
    const hidden = title
      .slice(revealedLetters)
      .replace(/[A-Za-z]/g, "_"); // Hides the letters, keeps the spaces/punctuation

    return revealed + hidden;
  }

  // Handle's guesses
  function handleGuess() {
  if (!review) return;

  if (guess.toLowerCase() === review.gameTitle.toLowerCase()) {
    setRevealedLetters(review.gameTitle.length);
    setMessage("Correct! You guessed the game!");
    setTimerActive(false);
  } else {
    if (revealedLetters < review.gameTitle.length) {
      const newRevealed = revealedLetters + 1;
      setRevealedLetters(newRevealed);
      setMessage("Wrong! Keep guessing — more letters revealed!");
    } else {
      setMessage("Out of hints! The full title is revealed.");
      setTimerActive(false);
    }
  }
}
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Review Guesser</h1>

      {!review && (
        <div className="mb-6 text-gray-300">
          <p className="text-lg font-semibold mb-2">How to Play:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You’ll get a random review from one game on the Games page.</li>
            <li>Guess which game the review belongs to before time runs out!</li>
            <li>Each wrong guess reveals more letters of the game title.</li>
            <li>You have 60 seconds to make your best guess. Lowercase answers are allowed. Good luck!</li>
          </ul>
        </div>
      )}
      <button
        onClick={getRandomReview}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >Get Random Review
      </button>

      {review && (
        <div className="mt-6">
          <p className="text-lg italic mb-4">{review.reviewText}</p>

          <p className="text-yellow-400 mb-2">Time left: {timeLeft}s</p>

          <p className="text-gray-300 mb-4">
            Title hint: <span className="font-mono">{getMaskedTitle()}</span>
          </p>

          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Guess the game..."
            className="px-3 py-2 rounded border-2 border-gray-400 bg-slate-800 text-white focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleGuess}
            className="ml-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >Submit Guess
          </button>
        </div>
      )}
    </div>
  );
}