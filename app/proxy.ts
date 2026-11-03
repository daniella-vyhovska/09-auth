import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await checkSession();

  const isAuth = Boolean(session?.email);

  if (
    !isAuth &&
    privateRoutes.some((r) => path.startsWith(r))
  ) {
    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  if (
    isAuth &&
    publicRoutes.some((r) => path.startsWith(r))
  ) {
    return NextResponse.redirect(
      new URL("/profile", req.url)
    );
  }

  return NextResponse.next();
}