export default function Home() {
  return (
    /*Responsive web design using Tailwind*/
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
      
      <div className="w-full max-w-5xl h-48 md:h-64 bg-slate-900 border border-slate-800 rounded-xl mb-8 flex items-center justify-center shadow-lg">
        {/* this is the section for that carousel I want to add, or at least a header. */}
        <span className="text-slate-500">[ Carousel / Header Placeholder ]</span>
      </div>

      {/*This is the section for our home page, one section for a bunch of random/popular games , one for a random game to look at? */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6">
        
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 text-center shadow-lg hover:border-slate-700 transition-all">
          <h1 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">|| What's hot ||</h1>
          <p className="text-slate-400 text-sm md:text-base">Games that are popular</p>
        </div>

        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 text-center shadow-lg hover:border-slate-700 transition-all">
          <h1 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">|| Random ||</h1>
          <p className="text-slate-400 text-sm md:text-base">Random assortment of games you might like!</p>
        </div>

      </div>
    </div>
  );
}