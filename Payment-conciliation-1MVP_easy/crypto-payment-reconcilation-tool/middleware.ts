import { NextRequest, NextResponse } from "next/server";
import { verifyAndDecodeAccessToken } from "@/lib/verifytoken.utils";
import { getClientCookies } from "./lib/cookies.utils";

// Public endpoints doesnt requried authentication...
const PUBLIC_ENDPOINTS = new Set([ "/auth/login","/auth/register","/auth/refresh","/auth/forgot-pswd","/auth/reset-pswd","/auth/verify-email"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl ;
  
  const authTokens = getClientCookies(request) ; // getting the tokens...
  if (!authTokens)  return NextResponse.json({ success: false, message: "Invalid or expired access token !" },{ status: 401 });

  // Allow CORS preflight requests...
  if (request.method === "OPTIONS") return NextResponse.next();

  // Skip public routes...
  if (PUBLIC_ENDPOINTS.has(pathname)) return NextResponse.next();

  // Verify access token...
  const payload = verifyAndDecodeAccessToken(authTokens.accessToken);

  if (!payload) return NextResponse.json({ success: false, message: "Invalid or expired access token !" },{ status: 401 });

  // Forward verified user identity..
  const requestHeaders = new Headers(request.headers);

  // Never trust identity headers supplied by the client
  requestHeaders.delete("x-user-id");

  requestHeaders.set("x-user-id", payload.userid);

  // Continue to route handler
  return NextResponse.next({ request: { headers: requestHeaders }});
}

// Apply middleware globally to /api/*
export const config = {
  matcher: ["/api/:path*"],
};