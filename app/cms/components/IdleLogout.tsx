"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";

const EVENTS = ["mousedown", "keydown", "touchstart", "scroll"];
const IDLE_MS = 1000 * 60 * 15; // 15 minutes

export function IdleLogout() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      authClient.signOut().then(() => {
        window.location.href = "/"; // full redirect after sign-out
      });
    }, IDLE_MS);
  };

  useEffect(() => {
    reset(); // initial start
    EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, reset));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null; // renders nothing
}





// "use client";

// import { useEffect, useRef } from "react";
// import { authClient } from "@/lib/auth-client";

// const EVENTS = ["mousedown", "keydown", "touchstart", "scroll"];
// const IDLE_MS = 1000 * 60 * 15; // 15 minutes

// export function IdleLogout() {
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const reset = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       authClient()
//         .signOut()
//         .then(() => {
//           window.location.href = "/"; // full redirect after sign-out
//         });
//     }, IDLE_MS);
//   };

//   useEffect(() => {
//     reset(); // initial start
//     EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }));
//     return () => {
//       EVENTS.forEach((e) => window.removeEventListener(e, reset));
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   return null; // renders nothing
// }