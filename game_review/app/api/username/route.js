import { cookies } from "next/headers"
import { jwtVerify } from 'jose';

export async function GET() {
  const cookieStore = await cookies()
  const login = cookieStore.get("login")?.value
  //console.log(login)
  //console.log(cookieStore.getAll())

  if (!login) {
    return Response.json({ authenticated: false }, { status: 401 })
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const userData = await jwtVerify(login, secretKey, {algorithms: ['HS256']});
    const email = userData.payload.email
    return Response.json({ authenticated: true, email });
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 401 })
  }
}
