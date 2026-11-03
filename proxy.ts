import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";

import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const refreshToken =
    cookieStore.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  let isAuthenticated = Boolean(accessToken);

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse =
        await checkSession();

      const setCookie =
        sessionResponse.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed =
            parseSetCookie(cookieStr);

          if (parsed.value) {
            response.cookies.set(
              parsed.name,
              parsed.value,
              parsed
            );
          }
        }
      }

      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  const isPrivateRoute =
    privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

  const isPublicRoute =
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};