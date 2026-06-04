import Link from "next/link";

function NavBar() {
    return (
        <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-slate-900 border-b border-slate-800 shadow-md">
          <h1 className="text-white text-2xl font-bold tracking-wide">Game.Review</h1>
          
          <div className="flex gap-2 sm:gap-4 font-medium text-sm sm:text-base">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors">HOME</Link>
            <Link href="/games" className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors">GAMES</Link>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors">ABOUT US</Link>
            <Link href="/signup" className="sm:ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-md shadow-blue-900/20">Sign Up</Link>
          </div>
        </nav>
    );
}

export default NavBar;