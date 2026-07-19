//If you already have the cookies thing sorted out you can change this if need be
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import { getGoogleUserInfo, updateOrCreateUserInfo } from "@/googleOauthUtils";
import {SignJWT} from 'jose'
import { NextResponse } from 'next/server';

export async function GET(params) {
    let request = await params;
    const {searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    console.log(code);

    const oauthUserInfo = await getGoogleUserInfo(code);
    console.log(oauthUserInfo);

    const createdUser = await updateOrCreateUserInfo(oauthUserInfo);
    
    //Creates jwt
    const secret = new TextEncoder().encode(
            process.env.JWT_SECRET,
    )
    const alg = 'HS256'

    const jwt = await new SignJWT({ 'userId' : createdUser._id.toString(), 'email' : createdUser.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)
    //Adds jwt to cookies
    const cookieStore = await cookies();
    cookieStore.set('session', jwt, {  httpOnly: true })
    //Redirects to home page
    redirect('/')
}

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete('session')
    return NextResponse.redirect('/')
}