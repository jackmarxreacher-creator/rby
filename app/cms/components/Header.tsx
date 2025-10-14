"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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

export default function Header() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/cms": "Dashboard",
    "/cms/customers": "Customers",
    "/cms/requests": "Requests",
    "/cms/products": "Products",
    "/cms/blog": "Blog Posts",
    "/cms/users": "Users & Roles",
    "/cms/gallery": "Gallery",
    "/cms/settings": "Settings",
    "/cms/logs": "Logs",
  };

  // find longest matching prefix key in titles
  const longestMatch = Object.keys(titles).reduce((longest, key) => {
    if (pathname.startsWith(key) && key.length > longest.length) {
      return key;
    }
    return longest;
  }, "");

  const currentTitle = titles[longestMatch] || "Dashboard";

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white">
      <h1 className="text-2xl text-[#be965b] font-semibold">{currentTitle}</h1>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-100">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>

        {/* Logout moved here */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center space-x-3 p-2 text-red-500 rounded hover:bg-red-400 hover:text-white transition">
              <LogOut className="h-5 w-5" />
              <span className="sr-only text-red-500">Logout</span>
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
                  await authClient.signOut();
                  window.location.href = "/";
                }}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}





// "use client";

// import { Bell, Search } from "lucide-react";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const pathname = usePathname();

//   const titles: Record<string, string> = {
//     "/cms": "Dashboard",
//     "/cms/customers": "Customers",
//     "/cms/requests": "Requests",
//     "/cms/products": "Products",
//     "/cms/blog": "Blog Posts",
//     "/cms/users": "Users & Roles",
//     "/cms/gallery": "Gallery",
//     "/cms/settings": "Settings",
//   };

//   // find longest matching prefix key in titles
//   const longestMatch = Object.keys(titles).reduce((longest, key) => {
//     if (
//       pathname.startsWith(key) &&
//       key.length > longest.length
//     ) {
//       return key;
//     }
//     return longest;
//   }, "");

//   const currentTitle = titles[longestMatch] || "Dashboard";

//   return (
//     <header className="h-14 flex items-center justify-between px-6 border-b bg-white">
//       <h1 className="text-2xl text-[#be965b] font-semibold">{currentTitle}</h1>

//       <div className="flex items-center space-x-4">
//         <button className="p-2 rounded hover:bg-gray-100">
//           <Search className="h-5 w-5" />
//         </button>
//         <button className="p-2 rounded hover:bg-gray-100">
//           <Bell className="h-5 w-5" />
//         </button>
//       </div>
//     </header>
//   );
// }
