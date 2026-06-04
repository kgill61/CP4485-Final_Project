import Image from "next/image"

export default function GamesPage() {
    return (
     /*Responsive web design using Tailwind*/
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
        
        <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
                Games page <span className="text-sm text-slate-500 font-normal block sm:inline mt-2 sm:mt-0">(Need to add forms)</span>
            </h1>
            
            {/* Image Container */}
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-700 shadow-md bg-slate-950 flex justify-center">
                <a href="/TES5-SkyrimSpecialEdition/page.js"><Image 
                    src="/skyrim-special-edition.jpg" 
                    alt="Skyrim photo" 
                    width={700} 
                    height={400} 
                    className="w-full h-auto object-cover"
                /></a>
            </div>
        </div>

    </div>
    )
}