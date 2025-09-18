import { createAuthClient } from "better-auth/react";

const isBrowser = typeof window !== "undefined";

export const authClient = createAuthClient({
  baseURL: isBrowser
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp } = authClient;





// import { createAuthClient } from 'better-auth/react'

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000'
// })

// export const { useSession } = authClient   // <-- add this




// import { createAuthClient } from 'better-auth/client'


// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
//   })



// import { createAuthClient } from 'better-auth/client'

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
// })