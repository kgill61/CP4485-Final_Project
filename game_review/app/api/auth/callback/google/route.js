//If you already have the cookies thing sorted out you can change this if need be
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import { getGoogleUserInfo, updateOrCreateUserInfo } from "../../../../googleOauthUtil";
import {SignJWT} from 'jose'
import { NextResponse } from 'next/server';
import { connectToDB } from "../../../../database/db";

export async function GET(params) {
    let request = await params;
    const {searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    const oauthUserInfo = await getGoogleUserInfo(code);

    const createdUser = await updateOrCreateUserInfo(oauthUserInfo);
    
    const secret = new TextEncoder().encode(
            process.env.JWT_SECRET,
    )
    const alg = 'HS256'

    const jwt = await new SignJWT({ 'userId' : createdUser._id.toString(), 'email' : createdUser.email })
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)
    
    const cookie = await cookies();
    cookie.set('login', jwt, {  httpOnly: true })
    
    try {
        const { db } = await connectToDB();
        let query = {email: createdUser.email}
        const exists = await db.collection("users").findOne(query);
        if (!exists) {
            const result = await db.collection("gameLibrary").insertOne({ 'userId' : createdUser._id.toString(), 'email' : createdUser.email, 'name': createdUser.name, 'admin': false });
            console.log(result)
        } else {
            console.log("Welcome back " + createdUser.name + "!")
        }
    } catch (error) {
        console.error("Error adding user:", error);
    }
    
    //Redirects to home page
    redirect('/')
}

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete('session')
    return NextResponse.redirect('/')
}