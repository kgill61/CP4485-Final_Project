import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function NavBar() {
    async function logout() {
      'use server'
      const cookie = await cookies();
      cookie.delete('login');
      redirect("/login");
    }

    const cookie = await cookies();
    const login = cookie.get('login');
    // Get the users name, from the cookie. Needs to be a backend request to avoid decrypting on the client side
    let userName = "You should not see this. If you do, there is a significant issue. Frankly this sentence is probably way too big for the navbar so this might make the website look quite weird."
    try {
      const res = await fetch("http://localhost:3000/api/username", {
        cache: "no-store",
        headers: {
          Cookie: cookie.toString() 
    }
      });
      const userData = await res.json();
      userName = userData.email //.email value lets it render properly
    } catch (err) {
      console.error("Fetch failed:", err);
    }

    return (
        <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-slate-900 border-b border-slate-800 shadow-md">
          <Link href="/"><h1 className="text-white text-2xl font-bold hover:bg-slate-800 tracking-wide">Game.Review</h1></Link>
          
          <div className="flex gap-2 sm:gap-4 font-medium text-sm sm:text-base">
            <Link href="/games" className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors">GAMES</Link>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors">ABOUT US</Link>
            {login != null ?
               <div className="px-4 py-2 rounded-lg">Signed in: {userName}</div> : <div className="px-4 py-2 rounded-lg">Not signed in</div>
            }
            {login == null ? <Link href="/login" className="sm:ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-md shadow-blue-900/20">Login</Link> : 
            <button onClick={logout} className="sm:ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-md shadow-blue-900/20">Logout</button>}
          </div>
        </nav>
    );
}

export default NavBar;