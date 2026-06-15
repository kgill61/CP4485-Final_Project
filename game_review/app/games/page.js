import CardList from "./gameList";

export default function GamesPage() {
    return (
    /*Responsive web design using Tailwind*/
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
        
        <div className="w-full max-w-6xl">
            {/* Page Header */}
            <div className="border-b border-slate-800 pb-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                    Game Library
                </h1>
                <p className="text-slate-400 mt-2 text-lg">
                    Browse our collection of reviewed games.
                </p>
            </div>

            {/* The Rendered List of Cards */}
            <CardList />
        </div>

    </div>
    );
}