"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { getUser } from "@/app/cms/users/actions";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  ClipboardList,
  UsersRound,
  Package,
  BarChart,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  role?: string | null;
  department?:
    | "Administration"
    | "Finance"
    | "HR"
    | "Sales"
    | "Warehouse";
};

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false); // NEW  mobile toggle

  useEffect(() => {
    if (!session?.user?.id) return;
    getUser(session.user.id)
      .then((dbUser) => {
        const src = (dbUser ?? session.user) as any;
        setUser({
          id: src.id,
          name: src.name ?? null,
          email: src.email,
          image: src.image ?? null,
          role: src.role ?? null,
          department: src.department ?? undefined,
        });
      })
      .catch(() => {
        const src = session.user as any;
        setUser({
          id: src.id,
          name: src.name ?? null,
          email: src.email,
          image: src.image ?? null,
          role: src.role ?? null,
          department: src.department ?? undefined,
        });
      });
  }, [session?.user?.id]);

  const commonLinks = [
    { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
    { href: "/cms/blog", label: "Blog Posts", icon: FileText },
    { href: "/cms/customers", label: "Customers", icon: Users },
    { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/cms/products", label: "Products", icon: Package },
    { href: "/cms/requests", label: "Requests", icon: ClipboardList },
  ];

  const adminLinks = [
    { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
    { href: "/cms/logs", label: "Logs", icon: BarChart },
  ];

  const links =
    user?.role === "ADMIN" ? [...commonLinks, ...adminLinks] : commonLinks;

  const longestMatch = links.reduce((longest, link) => {
    if (pathname.startsWith(link.href) && link.href.length > longest.length)
      return link.href;
    return longest;
  }, "");

  /* NEW  close sidebar when route changes on mobile */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* ----------  MOBILE TOP BAR  ---------- */}
      <header className="md:hidden flex items-center justify-between bg-black text-white px-4 py-3 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logos/rby_color_logo.webp"
            alt="RBY Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-bold">RBY LTD.</span>
        </div>
        <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* ----------  SIDEBAR  ---------- */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 md:w-64
          bg-black text-white flex flex-col h-full
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo / Title */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = href === longestMatch;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition
                  ${isActive
                    ? "bg-[#be965b] text-black font-medium"
                    : "text-gray-300 hover:bg-neutral-800"
                  }`}
                onClick={() => setOpen(false)} // handy on mobile
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User strip */}
        <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Image
                  src={user.image || "/images/user.jpg"}
                  alt={user.name ?? "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <p className="font-medium text-white">{user.name ?? "User"}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  {user.department && (
                    <p className="text-xs text-gray-400">{user.department}</p>
                  )}
                </div>
              </>
            ) : (
              <div>
                <p className="font-medium text-white">Loading…</p>
                <p className="text-xs text-gray-400">please wait</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}





// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient, useSession } from "@/lib/auth-client";
// import { getUser } from "@/app/cms/users/actions";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   ClipboardList,
//   UsersRound,
//   Package,
//   BarChart,
//   Download,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// type User = {
//   id: string;
//   name: string | null;
//   email: string;
//   image?: string | null;
//   role?: string;
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (!session?.user?.id) return;

//     getUser(session.user.id)
//       .then((dbUser) => setUser(dbUser ?? session.user))
//       .catch(() => setUser(session.user));
//   }, [session?.user?.id]);

//   // Links always visible to all roles
//   const commonLinks = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//   ];

//   // Links only for Admin role
//   const adminLinks = [
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/logs", label: "Logs", icon: BarChart },
//     // { href: "/cms/export", label: "Export Data", icon: Download },
//   ];

//   // Determine links based on role
//   const links =
//     user?.role === "ADMIN" ? [...commonLinks, ...adminLinks] : commonLinks;

//   // find longest matching href prefix for active link highlight
//   const longestMatch = links.reduce((longest, link) => {
//     if (pathname.startsWith(link.href) && link.href.length > longest.length) {
//       return link.href;
//     }
//     return longest;
//   }, "");

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
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

//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => {
//           const isActive = href === longestMatch;
//           return (
//             <Link
//               key={href}
//               href={href}
//               className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//                 isActive
//                   ? "bg-[#be965b] text-black font-medium"
//                   : "text-gray-300 hover:bg-neutral-800"
//               }`}
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name ?? "User"}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name ?? "User"}</p>
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
//       </div>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { authClient, useSession } from "@/lib/auth-client";
// import { getUser } from "@/app/cms/users/actions";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image as ImageIcon,
//   ClipboardList,
//   UsersRound,
//   Package,
//   LogOut,
//   BarChart, // For Logs icon (use appropriate lucide-react icon)
//   Download, // For Export Data icon
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

// type User = {
//   id: string;
//   name: string | null;
//   email: string;
//   image?: string | null;
//   role?: string; // include user role here
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);

//   const { data: session } = useSession();

//   useEffect(() => {
//     if (!session?.user?.id) return;

//     getUser(session.user.id)
//       .then((dbUser) => setUser(dbUser ?? session.user))
//       .catch(() => setUser(session.user));
//   }, [session?.user?.id]);

//   // Links always visible to all roles
//   const commonLinks = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//   ];

//   // Links only for Admin role
//   const adminLinks = [
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/logs", label: "Logs", icon: BarChart },
//     { href: "/cms/export", label: "Export Data", icon: Download },
//   ];

//   // Determine links based on role
//   const links =
//     user?.role === "ADMIN"
//       ? [...commonLinks, ...adminLinks]
//       : commonLinks;

//   // find longest matching href prefix for active link highlight
//   const longestMatch = links.reduce((longest, link) => {
//     if (
//       pathname.startsWith(link.href) &&
//       link.href.length > longest.length
//     ) {
//       return link.href;
//     }
//     return longest;
//   }, "");

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
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

//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => {
//           const isActive = href === longestMatch;
//           return (
//             <Link
//               key={href}
//               href={href}
//               className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//                 isActive
//                   ? "bg-[#be965b] text-black font-medium"
//                   : "text-gray-300 hover:bg-neutral-800"
//               }`}
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name ?? "User"}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name ?? "User"}</p>
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
//                   await authClient.signOut();
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
// import { authClient, useSession } from "@/lib/auth-client";
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

// type User = {
//   id: string;
//   name: string | null;
//   email: string;
//   image?: string | null;
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);

//   const { data: session } = useSession();

//   const links = [
//     { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/cms/blog", label: "Blog Posts", icon: FileText },
//     { href: "/cms/customers", label: "Customers", icon: Users },
//     { href: "/cms/gallery", label: "Gallery", icon: ImageIcon },
//     { href: "/cms/products", label: "Products", icon: Package },
//     { href: "/cms/requests", label: "Requests", icon: ClipboardList },
//     { href: "/cms/users", label: "Users & Roles", icon: UsersRound },
//     { href: "/cms/settings", label: "Settings", icon: Settings },
//   ];

//   useEffect(() => {
//     if (!session?.user?.id) return;

//     getUser(session.user.id)
//       .then((dbUser) => setUser(dbUser ?? session.user))
//       .catch(() => setUser(session.user));
//   }, [session?.user?.id]);

//   // find longest matching href prefix from links for active highlight
//   const longestMatch = links.reduce((longest, link) => {
//     if (
//       pathname.startsWith(link.href) &&
//       link.href.length > longest.length
//     ) {
//       return link.href;
//     }
//     return longest;
//   }, "");

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col h-full">
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

//       <nav className="flex-1 p-4 space-y-2">
//         {links.map(({ href, label, icon: Icon }) => {
//           const isActive = href === longestMatch;
//           return (
//             <Link
//               key={href}
//               href={href}
//               className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
//                 isActive
//                   ? "bg-[#be965b] text-black font-medium"
//                   : "text-gray-300 hover:bg-neutral-800"
//               }`}
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-neutral-800 text-sm text-gray-400 space-y-4">
//         <div className="flex items-center space-x-3">
//           {user ? (
//             <>
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name ?? "User"}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover border border-neutral-700"
//               />
//               <div>
//                 <p className="font-medium text-white">{user.name ?? "User"}</p>
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
//                   await authClient.signOut();
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
