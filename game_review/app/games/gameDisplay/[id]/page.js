// setup this page so that it grabs the object sent to it, and displays a page based on that object. so each portion of the content is generated from said object (Images, description, reviews, etc)
// Definitely use Databases for this later on, but you can try and get a layout down for it if you want

import { cookies } from "next/headers";
import { connectToDB } from "../../../database/db";
import jwt from "jsonwebtoken";

export default async function gamePage({params}) {
  const id = await params;
  const cookie = await cookies();
  const login = cookie.get('login');

  const {db} = await connectToDB();
  
  let game = await db.collection('gameLibrary').findOne({id: parseInt(id.id)});
  let reviews = await db.collection("reviews").find({ gameId: parseInt(id.id) }).toArray();

  let imageSRC = `../../${game.image}`

  return (
    /*AI Assisted Tailwind*/
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
      
      {/* Main Game Details Card */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 border-b border-slate-800 pb-4 tracking-wide">
          {game.title}
        </h1>
        
        {/* Image Container */}
        <div className="w-full h-64 md:h-96 bg-slate-950 rounded-xl overflow-hidden mb-8 border border-slate-700 shadow-md">
          <img 
            src={imageSRC} 
            alt={game.image} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Description */}
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
          {game.description}
        </p>

        {/* Reviews Section Placeholder */}
        <div className="mt-8 border-t border-slate-800 pt-8 bg-slate-950/50 rounded-xl p-6 border">
            {login && (
            <a href={`/review?gameId=${game.id}`}><button className="bg-white font-bold text-black px-2 py-2 rounded shadow hover:bg-gray-100">Write a Review for a game</button></a>)}
            {/*Review list*/}
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((r, i) => {
              const decoded = jwt.decode(r.user); //Decodes JSON email and makes it readable
              const email = decoded?.email || "Anonymous";
              return (
                <div key={i} className="mb-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-slate-300">{r.reviewText}</p>
                  <p className="text-slate-400 text-sm mt-2">Rating: {r.rating}/5</p>
                  <p className="text-slate-500 text-sm mt-1">By: {email}</p>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400">No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
