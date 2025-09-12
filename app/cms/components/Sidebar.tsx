"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/app/cms/users/actions";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Settings,
  ClipboardList,
  UsersRound,
  Package,
  LogOut,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const links = [
    { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
    { href: "/cms/customers", label: "Customers", icon: Users },
    { href: "/cms/requests", label: "Requests", icon: ClipboardList },
    { href: "/cms/products", label: "Products", icon: Package },
    { href: "/cms/blog", label: "Blog Posts", icon: FileText },
    { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
    { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/cms/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    authClient.session().then(async (session) => {
      if (!session?.user?.id) return;

      try {
        const dbUser = await getUser(session.user.id);
        setUser(dbUser || session.user);
      } catch (err) {
        console.error("getUser failed:", err);
        setUser(session.user as User);
      }
    });
  }, []);

  return (
    <aside className="w-64 bg-black text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
        <Image
          src={user?.image || "/images/logos/rby_color_logo.webp"}
          alt="RBY Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <div>
          <span>RBY LTD.</span>
          <p className="text-xs text-gray-400">Content Management</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
              pathname === href
                ? "bg-[#be965b] text-black font-medium"
                : "text-gray-300 hover:bg-neutral-800"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer with Profile + Logout */}
      <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Image
                src={user.image || "/images/user.jpg"}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full object-cover border border-neutral-700"
              />
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </>
          ) : (
            <div>
              <p className="font-medium text-white">Loading…</p>
              <p className="text-xs text-gray-400">please wait</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out and redirected to the homepage.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await new authClient().signOut();
                  window.location.href = "/";
                }}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}







// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import { getUser } from "@/app/cms/users/actions";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { useEffect, useState } from "react";

// /* ----------  TYPE FOR LOGGED-IN USER  ---------- */
// type User = {
//   id: string;
//   name: string;
//   email: string;
//   image?: string | null;
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   useEffect(() => {
//     const client = new authClient();
//     client.session().then(async (session) => {
//       if (!session?.user?.id) return;

//       try {
//         const dbUser = await getUser(session.user.id);
//         setUser(dbUser || session.user); // fallback to session
//       } catch (err) {
//         console.error("getUser failed:", err);
//         setUser(session.user as User);
//       }
//     });
//   }, []);

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src={user?.image || "/images/logos/rby_color_logo.webp"}
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name}</p>
//                 <p className="text-xs text-gray-400">{user.email}</p>
//               </div>
//             </>
//           ) : (
//             <div>
//               <p className="font-medium text-white">Loading…</p>
//               <p className="text-xs text-gray-400">please wait</p>
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={async () => {
//                   await new authClient().signOut();
//                   window.location.href = "/";
//                 }}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }






// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import { getUser } from "@/app/cms/users/actions";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { useEffect, useState } from "react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   useEffect(() => {
//     // 1. read Better Auth session cookie
//     const client = new authClient();
//     client.session().then((session) => {
//       if (session?.user?.id) {
//         // 2. fetch full user row
//         getUser(session.user.id).then(setUser);
//       }
//     });
//   }, []);

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src={user?.image || "/images/logos/rby_color_logo.webp"}
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name}</p>
//                 <p className="text-xs text-gray-400">{user.email}</p>
//               </div>
//             </>
//           ) : (
//             <div>
//               <p className="font-medium text-white">Admin User</p>
//               <p className="text-xs text-gray-400">admin@rby.com</p>
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={async () => {
//                   await new authClient().signOut();
//                   window.location.href = "/"; // full redirect after sign-out
//                 }}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }





// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import { getUser } from "@/app/cms/users/actions";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { useEffect, useState } from "react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   useEffect(() => {
//     // 1. read Better Auth session cookie
//     const client = new authClient();
//     client.session().then((session) => {
//       if (session?.user?.id) {
//         // 2. fetch full user row
//         getUser(session.user.id).then(setUser);
//       }
//     });
//   }, []);

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src={user?.image || "/images/logos/rby_color_logo.webp"}
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name}</p>
//                 <p className="text-xs text-gray-400">{user.email}</p>
//               </div>
//             </>
//           ) : (
//             <div>
//               <p className="font-medium text-white">Admin User</p>
//               <p className="text-xs text-gray-400">admin@rby.com</p>
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button
//               onClick={() => new authClient().signOut()}
//               className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left"
//             >
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => new authClient().signOut()}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import { getUser } from "@/lib/user"; // Import the function to fetch user details from the database

// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   // Fetch user details from Better Auth session
//   const client = new authClient();
//   const session = client.session();
//   const user = session ? session.user : null;

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src={user?.image || "/images/logos/rby_color_logo.webp"}
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/avatars/user.webp"} // fallback to default avatar
//                 alt={user.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name}</p>
//                 <p className="text-xs text-gray-400">{user.email}</p>
//               </div>
//             </>
//           ) : (
//             <div>
//               <p className="font-medium text-white">Admin User</p>
//               <p className="text-xs text-gray-400">admin@rby.com</p>
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => client.signOut()}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { useEffect } from "react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   // UseEffect to ensure client-side execution
//   useEffect(() => {
//     const client = new authClient();
//     const session = client.session();
//     if (session) {
//       // You can do something with the session.user here if needed
//     }
//   }, []);

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           <Image
//             src="/images/avatars/user.webp"
//             alt="Admin Avatar"
//             width={40}
//             height={40}
//             className="rounded-full object-cover border border-neutral-700"
//           />
//           <div>
//             <p className="font-medium text-white">Admin User</p>
//             <p className="text-xs text-gray-400">admin@rby.com</p>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => {
//                   window.location.href = "/";
//                 }}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }





// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient } from "@/lib/auth-client";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   // Fetch user details from Better Auth session
//   const client = new authClient();
//   const session = await client.session();
//   null ? null : session.user;

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src={session?.user.image || "/images/logos/rby_color_logo.webp"}
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           {session?.user ? (
//             <>
//               <Image
//                 src={session.user.image || "/images/avatars/user.webp"} // fallback to default avatar
//                 alt={session.user.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{session.user.name}</p>
//                 <p className="text-xs text-gray-400">{session.user.email}</p>
//               </div>
//             </>
//           ) : (
//             <div>
//               <p className="font-medium text-white">Admin User</p>
//               <p className="text-xs text-gray-400">admin@rby.com</p>
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => client.signOut()}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }






// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Profile + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         {/* Profile Section */}
//         <div className="flex items-center space-x-3">
//           <Image
//             src="/images/avatars/user.webp" // replace with logged-in user avatar
//             alt="Admin Avatar"
//             width={40}
//             height={40}
//             className="rounded-full object-cover border border-neutral-700"
//           />
//           <div>
//             <p className="font-medium text-white">Admin User</p>
//             <p className="text-xs text-gray-400">admin@rby.com</p>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => {
//                   window.location.href = "/";
//                 }}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }





// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer with Admin + Logout */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-3">
//         <div>
//           <p className="font-medium">Admin User</p>
//           <p className="text-xs">admin@rby.com</p>
//         </div>

//         {/* Logout Button */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 hover:text-red transition w-full text-left">
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be logged out and redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => {
//                   window.location.href = "/";
//                 }}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400">
//         <p className="font-medium">Admin User</p>
//         <p className="text-xs">admin@rby.com</p>

//         {/* ✅ Logout Button with styled AlertDialog */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="flex items-center space-x-2 mt-4 text-red-400 hover:text-red-300 transition">
//               <LogOut className="h-4 w-4" />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent className="bg-white text-black">
//             <AlertDialogHeader>
//               <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Are you sure you want to log out? You will be redirected to the homepage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => (window.location.href = "/")}
//                 className="bg-red-500 text-white hover:bg-red-600"
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </aside>
//   );
// }





// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       router.push("/"); // ✅ Go back to homepage
//     }
//   };

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400">
//         <p className="font-medium">Admin User</p>
//         <p className="text-xs">admin@rby.com</p>

//         {/* ✅ Logout Button with confirmation */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 mt-4 text-red-400 hover:text-red-300 transition"
//         >
//           <LogOut className="h-4 w-4" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }





// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/products", label: "Products", icon: Package }, // ✅ New Products link
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   const handleLogout = () => {
//     router.push("/"); // ✅ Go back to homepage
//   };

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400">
//         <p className="font-medium">Admin User</p>
//         <p className="text-xs">admin@rby.com</p>

//         {/* ✅ Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 mt-4 text-red-400 hover:text-red-300 transition"
//         >
//           <LogOut className="h-4 w-4" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   Settings,
//   ClipboardList,
//   UsersRound,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800 flex items-center space-x-3">
//         <Image
//           src="/images/logos/rby_color_logo.webp"
//           alt="RBY Logo"
//           width={32}
//           height={32}
//           className="object-contain"
//         />
//         <div>
//           <span>RBY LTD.</span>
//           <p className="text-xs text-gray-400">Content Management</p>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400">
//         <p className="font-medium">Admin User</p>
//         <p className="text-xs">admin@rby.com</p>
//       </div>
//     </aside>
//   );
// }






// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image,
//   Settings,
//   ClipboardList,
//   UsersRound,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/gallery", label: "Gallery", icon: Image },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-4 font-bold text-lg border-b border-neutral-800">
//         RBY CMS
//         <p className="text-xs text-gray-400">Content Management</p>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//               pathname === href
//                 ? "bg-[#be965b] text-black font-medium"
//                 : "text-gray-300 hover:bg-neutral-800"
//             }`}
//           >
//             <Icon className="h-5 w-5" />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400">
//         <p className="font-medium">Admin User</p>
//         <p className="text-xs">admin@rby.com</p>
//       </div>
//     </aside>
//   );
// }
