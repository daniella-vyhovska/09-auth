import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const refreshToken =
    cookieStore.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  let isAuthenticated =
    Boolean(accessToken);

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(
        `${req.nextUrl.origin}/api/auth/session`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        }
      );

      const data = await response.json();

      isAuthenticated =
        data.success === true;
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};