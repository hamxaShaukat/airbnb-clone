import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  
  
  

  // Restrict /login for logged-in users
  if (nextUrl.pathname === "/login" && user) {
  
    return Response.redirect(new URL("/", nextUrl));
  }

  // Role-based access control
  if (nextUrl.pathname.startsWith("/listings")) {
    if (!user || user.role === "guest") {
    
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!user || user.role !== "admin") {
    
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/insights")) {
    if (!user || user.role === "guest") {
    
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }


});

export const config = {
  matcher: [
    "/listings/:path*",
    "/dashboard/:path*",
    "/insights/:path*",
    "/login",
  ],
};
