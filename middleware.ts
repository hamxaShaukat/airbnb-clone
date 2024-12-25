import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  console.log("Request URL:", nextUrl.pathname);
  console.log("Auth object:", user?.role);
  console.log("Auth email:", user?.email);

  // Restrict /login for logged-in users
  if (nextUrl.pathname === "/login" && user) {
    console.log("Redirecting to home: user already logged in");
    return Response.redirect(new URL("/", nextUrl));
  }

  // Role-based access control
  if (nextUrl.pathname.startsWith("/listings")) {
    if (!user || user.role === "guest") {
      console.log("Redirecting to unauthorized: guest cannot access listings");
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!user || user.role !== "admin") {
      console.log("Redirecting to unauthorized: only admin can access dashboard");
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/insights")) {
    if (!user || user.role === "guest") {
      console.log("Redirecting to unauthorized: guest cannot access insights");
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  console.log("User is authorized for this route");
});

export const config = {
  matcher: [
    "/listings/:path*",
    "/dashboard/:path*",
    "/insights/:path*",
    "/login",
  ],
};
