"use client";

import { useState, useMemo } from "react";
import { RequestAction } from "./RequestActions";

const ITEMS_PER_PAGE = 8; // <-- rows per page

export function RequestTable({ requests, selectedIds: externalSelectedIds, onSelectionChange }: { requests: any[]; selectedIds?: string[]; onSelectionChange?: (ids: string[]) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // sync external selection from parent
  if (externalSelectedIds && Array.isArray(externalSelectedIds)) {
    const different = externalSelectedIds.length !== selectedIds.length || externalSelectedIds.some(id => !selectedIds.includes(id));
    if (different) setSelectedIds(externalSelectedIds);
  }

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
      {/* Desktop / Tablet: table */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-[#cccccc]">
        <table className="min-w-full bg-[#fcfbf8]">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedIds.length > 0 && currentRows.every(r => selectedIds.includes(r.id))}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      const next = Array.from(new Set([...selectedIds, ...currentRows.map(r => r.id)]));
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    } else {
                      const next = selectedIds.filter(id => !currentRows.some(r => r.id === id));
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    }
                  }}
                />
              </th>
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
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedIds.includes(req.id)}
                    onChange={(e) => {
                      let next: string[] = [];
                      if (e.currentTarget.checked) next = [...selectedIds, req.id];
                      else next = selectedIds.filter(id => id !== req.id);
                      setSelectedIds(next);
                      onSelectionChange?.(next);
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  <a href={`/cms/requests/${req.id}/view`} className="hover:underline">{req.customer?.name}</a>
                  {req.customer?.email ? ` (${req.customer.email})` : null}
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

      {/* Mobile: card list */}
      <div className="block sm:hidden space-y-3">
        {currentRows.map((req) => (
          <div key={req.id} className="bg-[#fcfbf8] border border-[#e6e0d6] rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1"
                  checked={selectedIds.includes(req.id)}
                  onChange={(e) => {
                    let next: string[] = [];
                    if (e.currentTarget.checked) next = [...selectedIds, req.id];
                    else next = selectedIds.filter((id) => id !== req.id);
                    setSelectedIds(next);
                    onSelectionChange?.(next);
                  }}
                />
                <div>
                  <a href={`/cms/requests/${req.id}/view`} className="font-medium hover:underline">{req.customer?.name}</a>
                  {req.customer?.email ? <div className="text-sm text-[#4a4a4a]">{req.customer.email}</div> : null}
                </div>
              </div>

              <div className="text-sm text-[#be965b] font-semibold">GHS {req.totalAmount}</div>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm text-[#4a4a4a]">
              <div>{req.status}</div>
              <div>{new Date(req.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="mt-3">
              <RequestAction request={req} />
            </div>
          </div>
        ))}
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

