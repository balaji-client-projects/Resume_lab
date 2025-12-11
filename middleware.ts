import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // 1. Get the path
    const path = request.nextUrl.pathname;

    // 2. Define protected routes
    const isProtectedRoute = path.startsWith("/dashboard");

    // 3. Get the session cookie (My Custom Auth)
    const session = request.cookies.get("user_session")?.value;

    // 4. Redirect Logic
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
