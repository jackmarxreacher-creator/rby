// lib/auth-server.ts
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

/**
 * Server helper to get current logged-in user by reading cookie and calling Better Auth API.
 */
export async function getCurrentUser() {
  // Get all cookies from the current server request context
  const cookieStore = await cookies();
  console.log("Cookies available:", cookieStore.getAll());

  // Use the correct cookie name as observed from your logs
  const token = cookieStore.get("better-auth.session_token")?.value;

  if (!token) {
    console.log("No better-auth.session_token cookie found");
    return null;
  }

  const res = await fetch(`${BASE_URL}/api/auth/session`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("Better Auth API session fetch failed with status", res.status);
    return null;
  }

  const session = await res.json();
  return session.user || null;
}



// // lib/auth-server.ts
// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

// /**
//  * Server helper to get current logged-in user by reading cookie and calling Better Auth API.
//  */
// export async function getCurrentUser() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("better-auth.session")?.value;
//   if (!token) return null;

//   const res = await fetch(`${BASE_URL}/api/auth/session`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) return null;

//   const session = await res.json();
//   return session.user || null;
// }
