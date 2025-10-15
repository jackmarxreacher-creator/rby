import { cookies } from "next/headers";
import { auth, getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { IdleLogout } from "./components/IdleLogout";

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  try {
    console.log("CMS Layout - Checking session...");
    
    // Use the getAuth helper function
    const session = await getAuth();
    
    console.log("CMS Layout - Session result:", session);

    if (!session?.user) {
      console.log("No valid session found, redirecting to login");
      redirect("/login");
    }

    console.log("Valid session found for user:", session.user.email);
  } catch (error) {
    console.error("CMS Layout - Error checking session:", error);
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#faf9f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <IdleLogout />
          {children}
        </main>
      </div>
    </div>
  );
}




// import { cookies } from "next/headers";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import { IdleLogout } from "./components/IdleLogout"; // client-side idle timer

// export default async function CmsLayout({ children }: { children: React.ReactNode }) {
//   const cookieStore = await cookies();
//   const session = await auth.api.getSession({
//     headers: { cookie: cookieStore.toString() },
//   });

//   if (!session) redirect("/login");

//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6 overflow-y-auto">
//           <IdleLogout /> {/* auto-logout after idle */}
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }





// import { cookies } from "next/headers";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default async function CmsLayout({ children }: { children: React.ReactNode }) {
//   const cookieStore = await cookies();               // ✅ await
//   const session = await auth.api.getSession({
//     headers: { cookie: cookieStore.toString() },
//   });

//   if (!session) redirect("/login");

//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




// import { cookies } from "next/headers";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default async function CmsLayout({ children }: { children: React.ReactNode }) {
//   // 1️⃣  grab cookies from the request
//   const cookieStore = cookies();
//   const session = await auth.api.getSession({
//     headers: { cookie: cookieStore.toString() },
//   });

//   // 2️⃣  redirect if not signed in
//   if (!session) {
//     redirect("/login");
//   }

//   // 3️⃣  render the CMS
//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




// // 1️⃣  Remove "use client" so it runs on the server
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default async function CmsLayout({ children }: { children: React.ReactNode }) {
//   // 2️⃣  Check session server-side
//   const session = await auth.api.getSession({ headers: {} });
//   if (!session) {
//     redirect("/login"); // 3️⃣  not logged in → redirect
//   }

//   // 4️⃣  Render the UI only when authenticated
//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




// "use client";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function CmsLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function CmsLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <div className="flex-1 p-6 overflow-y-auto">{children}</div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function CmsLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen bg-[#faf9f6]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }
