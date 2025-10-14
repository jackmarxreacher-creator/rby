// app/cms/sections/StatsCards.tsx  (SERVER COMPONENT)
import { Users, ClipboardList, FileText, Image } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getCounts() {
  const [customers, requests, gallery, blogPosts] = await Promise.all([
    prisma.customer.count(),
    prisma.order.count(),
    prisma.galleryItem.count(), // photos + videos
    prisma.blogPost.count(),    // ← NEW
  ]);
  return { customers, requests, gallery, blogPosts };
}

export default async function StatsCards() {
  const { customers, requests, gallery, blogPosts } = await getCounts();

  const stats = [
    { label: "Total Customers", value: customers.toLocaleString(), icon: Users, color: "bg-amber-100 text-amber-600" },
    { label: "Active Requests", value: requests.toLocaleString(), icon: ClipboardList, color: "bg-blue-100 text-blue-600" },
    { label: "Blog Posts", value: blogPosts.toLocaleString(), icon: FileText, color: "bg-green-100 text-green-600" }, // ← DYNAMIC
    { label: "Gallery Items", value: gallery.toLocaleString(), icon: Image, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}




// // app/cms/sections/StatsCards.tsx  (SERVER COMPONENT)
// import { Users, ClipboardList, FileText, Image } from "lucide-react";
// import { prisma } from "@/lib/prisma";

// async function getCounts() {
//   const [customers, requests, gallery] = await Promise.all([
//     prisma.customer.count(),
//     prisma.order.count(),
//     prisma.galleryItem.count(), // photos + videos
//   ]);
//   return { customers, requests, gallery };
// }

// export default async function StatsCards() {
//   const { customers, requests, gallery } = await getCounts();

//   const stats = [
//     { label: "Total Customers", value: customers.toLocaleString(), icon: Users, color: "bg-amber-100 text-amber-600" },
//     { label: "Active Requests", value: requests.toLocaleString(), icon: ClipboardList, color: "bg-blue-100 text-blue-600" },
//     // Blog card – hard-coded until blog CRUD is ready
//     { label: "Blog Posts", value: "156", icon: FileText, color: "bg-green-100 text-green-600" },
//     { label: "Gallery Items", value: gallery.toLocaleString(), icon: Image, color: "bg-purple-100 text-purple-600" },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {stats.map((stat, idx) => {
//         const Icon = stat.icon;
//         return (
//           <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <h3 className="text-2xl font-bold">{stat.value}</h3>
//             </div>
//             <div className={`p-3 rounded-full ${stat.color}`}>
//               <Icon className="h-5 w-5" />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }




// // app/cms/sections/StatsCards.tsx  (SERVER COMPONENT)
// import { Users, ClipboardList, FileText, Image } from "lucide-react";
// import { prisma } from "@/lib/prisma";

// async function getCounts() {
//   const [customers, requests, posts, gallery] = await Promise.all([
//     prisma.customer.count(),
//     prisma.order.count(),
//     prisma.galleryItem.count({ where: { type: "photo" } }),
//     prisma.galleryItem.count({ where: { type: "video" } }),
//   ]);
//   return { customers, requests, posts, gallery };
// }

// export default async function StatsCards() {
//   const { customers, requests, posts, gallery } = await getCounts();

//   const stats = [
//     { label: "Total Customers", value: customers.toLocaleString(), icon: Users, color: "bg-amber-100 text-amber-600" },
//     { label: "Active Requests", value: requests.toLocaleString(), icon: ClipboardList, color: "bg-blue-100 text-blue-600" },
//     { label: "Blog Posts", value: posts.toLocaleString(), icon: FileText, color: "bg-green-100 text-green-600" },
//     { label: "Gallery Items", value: gallery.toLocaleString(), icon: Image, color: "bg-purple-100 text-purple-600" },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {stats.map((stat, idx) => {
//         const Icon = stat.icon;
//         return (
//           <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <h3 className="text-2xl font-bold">{stat.value}</h3>
//             </div>
//             <div className={`p-3 rounded-full ${stat.color}`}>
//               <Icon className="h-5 w-5" />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }




// "use client";

// import { Users, ClipboardList, FileText, Image } from "lucide-react";

// const stats = [
//   {
//     label: "Total Customers",
//     value: "1,247",
//     change: "+12 this month",
//     icon: Users,
//     color: "bg-amber-100 text-amber-600",
//   },
//   {
//     label: "Active Requests",
//     value: "89",
//     change: "23 today",
//     icon: ClipboardList,
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     label: "Blog Posts",
//     value: "156",
//     change: "12 drafts",
//     icon: FileText,
//     color: "bg-green-100 text-green-600",
//   },
//   {
//     label: "Gallery Items",
//     value: "342",
//     change: "8 videos",
//     icon: Image,
//     color: "bg-purple-100 text-purple-600",
//   },
// ];

// export default function StatsCards() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {stats.map((stat, idx) => {
//         const Icon = stat.icon;
//         return (
//           <div
//             key={idx}
//             className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between"
//           >
//             <div>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <h3 className="text-2xl font-bold">{stat.value}</h3>
//               <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
//             </div>
//             <div
//               className={`p-3 rounded-full ${stat.color}`}
//             >
//               <Icon className="h-5 w-5" />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
