"use client";

import Image from "next/image";

const customers = [
  {
    name: "Akosua Mensah",
    type: "Retail Customer",
    avatar: "/images/customers/Akosua_Boateng.webp",
    time: "2 hours ago",
  },
  {
    name: "Kwame Asante",
    type: "Wholesale",
    avatar: "/images/customers/Kwame_Mensah.jpg",
    time: "5 hours ago",
  },
  {
    name: "Ama Osei",
    type: "Retail Customer",
    avatar: "/images/customers/Janet_Siaw.webp",
    time: "1 day ago",
  },
];

export default function RecentCustomers() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recent Customers</h2>
        <button className="text-sm text-[#be965b] hover:underline">
          View All
        </button>
      </div>
      <ul className="space-y-4">
        {customers.map((c, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={c.avatar}
                alt={c.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500">{c.type}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">{c.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
