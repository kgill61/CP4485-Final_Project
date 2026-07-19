import { redirect } from 'next/navigation'
// For some reason @/ wouldn't work, so using ../../ instead.
import { getGoogleOauthUrl } from '../googleOauthUtil';

export default async function Login() {
  async function login() {
    "use server";
    const redirectURL = getGoogleOauthUrl();
    redirect(redirectURL);
  }

  return (
    /* AI generated Tailwind CSS */
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-6">
          Login
        </h2>
        <form action={login}>
          <button 
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-md shadow-blue-900/20"
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
