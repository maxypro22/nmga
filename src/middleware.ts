import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "nmj_session";

async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] }
    );
    return typeof payload.sub === "string";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  // Dashboard pages (English and Arabic): redirect to the matching login when
  // unauthenticated.
  const isArDashboard = pathname.startsWith("/ar/dashboard");
  if (pathname.startsWith("/dashboard") || isArDashboard) {
    if (!(await isAuthenticated(token))) {
      const url = req.nextUrl.clone();
      url.pathname = isArDashboard ? "/ar/login" : "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protected dashboard API routes: 401 when unauthenticated.
  if (pathname.startsWith("/api/dashboard")) {
    if (!(await isAuthenticated(token))) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ar/dashboard/:path*",
    "/api/dashboard/:path*",
  ],
};
