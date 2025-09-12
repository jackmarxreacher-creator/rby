"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

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
  };

  const currentTitle = titles[pathname] || "Dashboard";

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
      </div>
    </header>
  );
}




// "use client";

// import { Bell, Search } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="h-14 flex items-center justify-between px-6 border-b bg-white">
//       <h1 className="text-lg font-semibold">Ricky Boakye Yiadom Dashboard</h1>

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
