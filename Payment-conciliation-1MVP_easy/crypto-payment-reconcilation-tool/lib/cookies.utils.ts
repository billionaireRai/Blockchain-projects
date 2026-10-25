
import "server-only";
import { NextRequest, NextResponse } from "next/server";

const accessTokenExp = process.env.JWT_ACCESS_EXPIRY! ;
const refreshTokenExp = process.env.JWT_REFRESH_EXPIRY! ;

export function getClientCookies(request: NextRequest): { accessToken: string ; refreshToken: string } | null {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) return null ;

  return { accessToken, refreshToken };
}

export function setCookiesForClient(response: NextResponse,accessToken: string,refreshToken: string): NextResponse {
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: parseInt(accessTokenExp) * 60, // 30 minutes
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: parseInt(refreshTokenExp) * 24 * 60 * 60, // 15 days
  });

  return response;
}

export function clearAllCookies(request: NextRequest,response: NextResponse): NextResponse {
  request.cookies.getAll().forEach((cookie) => response.cookies.delete(cookie) );

  return response;
}