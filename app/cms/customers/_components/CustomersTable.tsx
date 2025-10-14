"use client";

import { useMemo, useState } from "react";
import { CustomerActions } from "./CustomerActions";
import Image from "next/image"; // ← already imported
import Link from "next/link";

const ITEMS_PER_PAGE = 8;

export function CustomersTable({ customers, selectedIds: externalSelectedIds, onSelectionChange }: { customers: any[]; selectedIds?: string[]; onSelectionChange?: (ids: string[]) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // sync external selection from parent
  if (externalSelectedIds && Array.isArray(externalSelectedIds)) {
    // only update when different to avoid infinite loops
    const different = externalSelectedIds.length !== selectedIds.length || externalSelectedIds.some(id => !selectedIds.includes(id));
    if (different) setSelectedIds(externalSelectedIds);
  }

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
  {/* Table (visible at all sizes) */}
  <div className="block overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
        <table className="min-w-full">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedIds.length > 0 && currentRows.every(r => selectedIds.includes(r.id))}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      // select all rows on current page
                      const next = Array.from(new Set([...selectedIds, ...currentRows.map(r => r.id)]));
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    } else {
                      // deselect current page rows
                      const next = selectedIds.filter(id => !currentRows.some(r => r.id === id));
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    }
                  }}
                />
              </th>
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
                {/* UOM removed */}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                {/* Case Pack removed */}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((c) => (
              <tr key={c.id} className="hover:bg-[#f3ede5]/50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedIds.includes(c.id)}
                    onChange={(e) => {
                      let next: string[] = [];
                      if (e.currentTarget.checked) next = [...selectedIds, c.id];
                      else next = selectedIds.filter(id => id !== c.id);
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={c.image ?? "/images/user.jpg"}
                      alt={c.name}
                      width={32}
                      height={32}
                      unoptimized
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        if (img && img.src.indexOf("/images/user.jpg") === -1) img.src = "/images/user.jpg"
                      }}
                      className="rounded-full object-cover"
                    />
                    <Link href={`/cms/customers/${c.id}/view`} className="hover:underline">
                      {c.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessName}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.businessType}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.email}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{c.phone}</td>
                {/* UOM and Case Pack removed from customers table row */}
                <td className="px-4 py-2">
                  <CustomerActions customer={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* (mobile stacked list removed) */}

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
