"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ProductActions } from "./ProductActions";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

const ITEMS_PER_PAGE = 8; // 2×4 grid

export function ProductCard({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentRows.map((product) => (
          <Card
            key={product.id}
            className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
          >
            <CardHeader className="p-3">
              <div className="relative w-full h-36 sm:h-40 rounded-t-xl overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
                  className="object-contain"
                />
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className="text-lg text-[#1c1c1c]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block max-w-[10rem] sm:max-w-[12rem] truncate" aria-label={product.name}>
                        {product.name.length > 15 ? `${product.name.slice(0, 15)}…` : product.name}
                      </span>
                    </TooltipTrigger>
                    {product.name.length > 15 && (
                      <TooltipContent side="top">
                        {product.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription className="text-sm text-[#4a4a4a] flex items-center gap-2">
                <span>{product.size}</span>
                {/* UOM & Case Pack inline with separators */}
                {product.uom && (
                  <>
                    <span className="text-[#9b9b9b]">•</span>
                    <span className="text-xs text-[#4a4a4a]">
                      {product.uom === 'BOTTLE' || product.uom === 'BOTTLE'?.toUpperCase()
                        ? 'Bottle'
                        : product.uom === 'CAS'
                        ? 'CAS'
                        : product.uom}
                    </span>
                  </>
                )}
                {typeof product.casePack === 'number' && product.casePack > 0 && (
                  <>
                    <span className="text-[#9b9b9b]">•</span>
                    <span className="text-xs text-[#4a4a4a]">Case: {product.casePack}</span>
                  </>
                )}
              </CardDescription>

              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4a4a4a]">Wholesale:</span>
                  <span className="text-[#9b7c4a] font-medium">
                    GHS {product.wholesalePrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#4a4a4a]">Retail:</span>
                  <span className="text-[#be965b] font-semibold">
                    GHS {product.retailPrice}
                  </span>
                </div>
                {/* ✅ null-safe check */}
                {product.discount != null && product.discount > 0 && (
                  <div className="text-xs bg-[#206b50]/20 text-[#206b50] px-2 py-1 rounded inline-block">
                    -{product.discount}%
                  </div>
                )}
                {/* removed separate UOM/Case block — now inline with size */}
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t border-[#cccccc]">
              <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="flex-1">
                  <ProductActions product={product} />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ----  PAGINATION  ---- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
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
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { ProductActions } from "./ProductActions";
// import type { Product } from "@prisma/client"; // ← import type

// interface Props {
//   products: Product[];
// }

// const ITEMS_PER_PAGE = 8; // 2×4 grid

// export function ProductCard({ products }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return products.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, products]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentRows.map((product) => (
//           <Card
//             key={product.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader className="p-3">
//               <Image
//                 src={product.image || "/placeholder.jpg"}
//                 alt={product.name}
//                 width={225}
//                 height={150}
//                 className="w-full h-40 object-contain rounded-t-xl"
//               />
//             </CardHeader>

//             <CardContent className="p-4">
//               <CardTitle className="text-lg text-[#1c1c1c]">
//                 {product.name}
//               </CardTitle>
//               <CardDescription className="text-sm text-[#4a4a4a]">
//                 {product.size}
//               </CardDescription>

//               <div className="mt-2 space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#4a4a4a]">Wholesale:</span>
//                   <span className="text-[#9b7c4a] font-medium">
//                     GHS {product.wholesalePrice}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#4a4a4a]">Retail:</span>
//                   <span className="text-[#be965b] font-semibold">
//                     GHS {product.retailPrice}
//                   </span>
//                 </div>
//                 {product.discount > 0 && (
//                   <div className="text-xs bg-[#206b50]/20 text-[#206b50] px-2 py-1 rounded inline-block">
//                     -{product.discount}%
//                   </div>
//                 )}
//               </div>
//             </CardContent>

//             <CardFooter className="p-4 border-t border-[#cccccc]">
//               <ProductActions product={product} />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* ----  PAGINATION  ---- */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
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

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { ProductActions } from "./ProductActions";

// interface Props {
//   products: Product[];
// }

// const ITEMS_PER_PAGE = 8; // 2×4 grid

// export function ProductCard({ products }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return products.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, products]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentRows.map((product) => (
//           <Card
//             key={product.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader className="p-3">
//               <Image
//                 src={product.image || "/placeholder.jpg"}
//                 alt={product.name}
//                 width={225}
//                 height={150}
//                 className="w-full h-40 object-contain rounded-t-xl"
//               />
//             </CardHeader>

//             <CardContent className="p-4">
//               <CardTitle className="text-lg text-[#1c1c1c]">
//                 {product.name}
//               </CardTitle>
//               <CardDescription className="text-sm text-[#4a4a4a]">
//                 {product.size}
//               </CardDescription>

//               <div className="mt-2 space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#4a4a4a]">Wholesale:</span>
//                   <span className="text-[#9b7c4a] font-medium">
//                     GHS {product.wholesalePrice}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#4a4a4a]">Retail:</span>
//                   <span className="text-[#be965b] font-semibold">
//                     GHS {product.retailPrice}
//                   </span>
//                 </div>
//                 {product.discount > 0 && (
//                   <div className="text-xs bg-[#206b50]/20 text-[#206b50] px-2 py-1 rounded inline-block">
//                     -{product.discount}%
//                   </div>
//                 )}
//               </div>
//             </CardContent>

//             <CardFooter className="p-4 border-t border-[#cccccc]">
//               <ProductActions product={product} />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* ----  PAGINATION  ---- */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
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





// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { ProductActions } from "./ProductActions";

// interface Props {
//   product: Product;
// }

// export function ProductCard({ product }: Props) {
//   return (
//     <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg">
//       <CardHeader className="p-3">
//         <Image
//           src={product.image || "/placeholder.jpg"}
//           alt={product.name}
//           width={225}
//           height={150}
//           className="w-full h-40 object-contain rounded-t-xl"
//         />
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{product.name}</CardTitle>
//         <CardDescription className="text-sm text-[#4a4a4a]">
//           {product.size}
//         </CardDescription>

//         {/* Prices */}
//         <div className="mt-2 space-y-1">
//           <div className="flex justify-between text-sm">
//             <span className="text-[#4a4a4a]">Wholesale:</span>
//             <span className="text-[#9b7c4a] font-medium">
//               GHS {product.wholesalePrice}
//             </span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-[#4a4a4a]">Retail:</span>
//             <span className="text-[#be965b] font-semibold">
//               GHS {product.retailPrice}
//             </span>
//           </div>
//           {product.discount > 0 && (
//             <div className="text-xs bg-[#206b50]/20 text-[#206b50] px-2 py-1 rounded inline-block">
//               -{product.discount}%
//             </div>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="p-4 border-t border-[#cccccc]">
//         <ProductActions product={product} />
//       </CardFooter>
//     </Card>
//   );
// }
