import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/'], // Defines the routes that are accessible without authentication
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Matches routes that do not end with a file extension or are not in the _next folder
    "/", // Matches the root route
    "/(api|trpc)(.*)", // Matches any route starting with "api" or "trpc"
  ],
};
