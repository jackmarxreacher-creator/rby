// app/cms/sections/RecentCustomers.tsx  (SERVER COMPONENT)
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getRecentCustomers() {
  return await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    select: { id: true, name: true, businessType: true, image: true, createdAt: true }, // ← NEW
  });
}

export default async function RecentCustomers() {
  const customers = await getRecentCustomers();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recent Customers</h2>
        <button className="text-sm text-[#be965b] hover:underline">View All</button>
      </div>
      <ul className="space-y-4">
        {customers.map((c) => (
          <li key={c.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={c.image ?? "/images/user.jpg"} // ← real DB value or default
                alt={c.name}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500">
                  {c.businessType === 'WHOLESALE' ? 'Wholesale' : 'Retail Customer'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                Math.ceil((c.createdAt.getTime() - Date.now()) / 36e5),
                'hour'
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}





// // app/cms/sections/RecentCustomers.tsx  (SERVER COMPONENT)
// import Image from "next/image";
// import { prisma } from "@/lib/prisma";

// async function getRecentCustomers() {
//   return await prisma.customer.findMany({
//     orderBy: { createdAt: 'desc' },
//     take: 3,
//     select: { id: true, name: true, businessType: true, createdAt: true },
//   });
// }

// export default async function RecentCustomers() {
//   const customers = await getRecentCustomers();

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-semibold text-lg">Recent Customers</h2>
//         <button className="text-sm text-[#be965b] hover:underline">View All</button>
//       </div>
//       <ul className="space-y-4">
//         {customers.map((c, idx) => (
//           <li key={c.id} className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Image
//                 src={`/images/customers/${c.name.replace(/\s+/g, '_')}.webp`} // fallback avatar
//                 alt={c.name}
//                 width={24}
//                 height={24}
//                 className="rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-medium text-gray-800">{c.name}</p>
//                 <p className="text-xs text-gray-500">
//                   {c.businessType === 'WHOLESALE' ? 'Wholesale' : 'Retail Customer'}
//                 </p>
//               </div>
//             </div>
//             <p className="text-xs text-gray-400">
//               {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
//                 Math.ceil((c.createdAt.getTime() - Date.now()) / 36e5),
//                 'hour'
//               )}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// "use client";

// import Image from "next/image";

// const customers = [
//   {
//     name: "Akosua Mensah",
//     type: "Retail Customer",
//     avatar: "/images/customers/Akosua_Boateng.webp",
//     time: "2 hours ago",
//   },
//   {
//     name: "Kwame Asante",
//     type: "Wholesale",
//     avatar: "/images/customers/Kwame_Mensah.jpg",
//     time: "5 hours ago",
//   },
//   {
//     name: "Ama Osei",
//     type: "Retail Customer",
//     avatar: "/images/customers/Janet_Siaw.webp",
//     time: "1 day ago",
//   },
// ];

// export default function RecentCustomers() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-semibold text-lg">Recent Customers</h2>
//         <button className="text-sm text-[#be965b] hover:underline">
//           View All
//         </button>
//       </div>
//       <ul className="space-y-4">
//         {customers.map((c, idx) => (
//           <li key={idx} className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Image
//                 src={c.avatar}
//                 alt={c.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-medium text-gray-800">{c.name}</p>
//                 <p className="text-xs text-gray-500">{c.type}</p>
//               </div>
//             </div>
//             <p className="text-xs text-gray-400">{c.time}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
