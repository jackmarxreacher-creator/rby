"use client";

import { useState, useMemo } from "react";
import { RequestAction } from "./RequestActions";

const ITEMS_PER_PAGE = 8; // <-- rows per page

export function RequestTable({ requests }: { requests: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------  slice for current page  ---------- */
  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return requests.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, requests]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
        <table className="min-w-full bg-[#fcfbf8]">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Customer
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Total Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((req) => (
              <tr key={req.id} className="hover:bg-[#f3ede5]/50">
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  {req.customer?.name} ({req.customer?.email})
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{req.status}</td>
                <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
                  GHS {req.totalAmount}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <RequestAction request={req} />
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

// import { RequestAction } from "./RequestActions";

// export function RequestTable({ requests }: { requests: any[] }) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
//       <table className="min-w-full bg-[#fcfbf8]">
//         <thead className="bg-[#f3ede5]">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Customer
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Status
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Total Amount
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Created At
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#cccccc]">
//           {requests.map((req) => (
//             <tr key={req.id} className="hover:bg-[#f3ede5]/50">
//               <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                 {req.customer?.name} ({req.customer?.email})
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{req.status}</td>
//               <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
//                 GHS {req.totalAmount}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                 {new Date(req.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-4 py-2">
//                 <RequestAction request={req} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

