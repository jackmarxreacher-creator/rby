"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProductActions } from "./ProductActions";

interface Props {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

export function ProductTable({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------  slice for current page  ---------- */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, products]);

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
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Size
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Wholesale
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Retail
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((p) => (
              <tr key={p.id} className="hover:bg-[#f3ede5]/50">
                <td className="p-2">
                  <Image
                    src={p.image || "/placeholder.jpg"}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  {p.name}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{p.size}</td>
                <td className="px-4 py-2 text-sm text-[#9b7c4a] font-medium">
                  GHS {p.wholesalePrice}
                </td>
                <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
                  GHS {p.retailPrice}
                </td>
                <td className="px-4 py-2">
                  <ProductActions product={p} />
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

// import Image from "next/image";
// import { ProductActions } from "./ProductActions";

// interface Props {
//   products: Product[];
// }

// export function ProductTable({ products }: Props) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
//       <table className="min-w-full bg-[#fcfbf8]">
//         <thead className="bg-[#f3ede5]">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Image
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Size
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Wholesale
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Retail
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#cccccc]">
//           {products.map((p) => (
//             <tr key={p.id} className="hover:bg-[#f3ede5]/50">
//               <td className="p-2">
//                 <Image
//                   src={p.image || "/placeholder.jpg"}
//                   alt={p.name}
//                   width={40}
//                   height={40}
//                   className="rounded object-cover"
//                 />
//               </td>
//               <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                 {p.name}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{p.size}</td>
//               <td className="px-4 py-2 text-sm text-[#9b7c4a] font-medium">
//                 GHS {p.wholesalePrice}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
//                 GHS {p.retailPrice}
//               </td>
//               <td className="px-4 py-2">
//                 <ProductActions product={p} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
