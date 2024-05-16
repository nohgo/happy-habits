import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  if (!cookies().get("token")?.value)
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
