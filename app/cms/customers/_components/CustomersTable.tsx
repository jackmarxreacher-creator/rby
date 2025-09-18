"use client";

import { useMemo, useState } from "react";
import { CustomerActions } from "./CustomerActions";
import Image from "next/image"; // ← already imported

const ITEMS_PER_PAGE = 8;

export function CustomersTable({ customers }: { customers: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return customers.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, customers]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
        <table className="min-w-full">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Business Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Business Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((c) => (
              <tr key={c.id} className="hover:bg-[#f3ede5]/50">
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={c.image ?? "/images/user.jpg"}
                      alt={c.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span>{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessName}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessType}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.email}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.phone}</td>
                <td className="px-4 py-2">
                  <CustomerActions customer={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====  PAGINATION  ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
          >
            Previous
          </button>

          <span className="font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}




// "use client";

// import { useMemo, useState } from "react";
// import { CustomerActions } from "./CustomerActions";

// const ITEMS_PER_PAGE = 8;

// export function CustomersTable({ customers }: { customers: any[] }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ----------  slice for current page  ---------- */
//   const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return customers.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, customers]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
//         <table className="min-w-full">
//           <thead className="bg-[#f3ede5]">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Name
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Business Name
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Business Type
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Email
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Phone
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#cccccc]">
//             {currentRows.map((c) => (
//               <tr key={c.id} className="hover:bg-[#f3ede5]/50">
//                 <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                   {c.name}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessName}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessType}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.email}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.phone}</td>
//                 <td className="px-4 py-2">
//                   <CustomerActions customer={c} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* =====  PAGINATION  ===== */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-6">
//           <button
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
//           >
//             Previous
//           </button>

//           <span className="font-medium text-sm">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// }





// "use client";

// import { CustomerActions } from "./CustomerActions";

// export function CustomersTable({ customers }: { customers: any[] }) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
//       <table className="min-w-full">
//         <thead className="bg-[#f3ede5]">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Business Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Business Type
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Email
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Phone
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#cccccc]">
//           {customers.map((c) => (
//             <tr key={c.id} className="hover:bg-[#f3ede5]/50">
//               <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                 {c.name}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessName}</td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessType}</td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.email}</td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.phone}</td>
//               <td className="px-4 py-2">
//                 <CustomerActions customer={c} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { CustomerActions } from "./CustomerActions";

// export function CustomersTable({ customers }: { customers: any[] }) {
//   return (
//     <table className="w-full border-collapse border border-gray-200 text-sm">
//       <thead>
//         <tr className="bg-[#f3ede5]">
//           <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
//           <th className="border border-gray-200 px-4 py-2">Business Name</th>
//           <th className="border border-gray-200 px-4 py-2">Business Type</th>
//           <th className="border border-gray-200 px-4 py-2">Email</th>
//           <th className="border border-gray-200 px-4 py-2">Phone</th>
//           <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {customers.map((c) => (
//           <tr key={c.id}>
//             <td className="border border-gray-200 px-4 py-2">{c.name}</td>
//             <td className="border border-gray-200 px-4 py-2">{c.businessName}</td>
//             <td className="border border-gray-200 px-4 py-2">{c.businessType}</td>
//             <td className="border border-gray-200 px-4 py-2">{c.email}</td>
//             <td className="border border-gray-200 px-4 py-2">{c.phone}</td>
//             <td className="border border-gray-200 px-4 py-2 text-center">
//               <CustomerActions customer={c} />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
