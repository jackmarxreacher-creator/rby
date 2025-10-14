"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CustomerActions } from "./CustomerActions";
import Link from "next/link";
import Image from "next/image"; // ← already imported

interface Props {
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    businessName?: string | null;
    businessType?: string | null;
    image?: string | null; // ← NEW
  }[];
}

const ITEMS_PER_PAGE = 8;

export default function CustomerCard({ customers }: Props) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentRows.map((c) => (
          <div key={c.id} className="px-4 sm:px-0">
            <Card className="mx-auto w-full max-w-[360px] sm:mx-0 sm:max-w-none bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg">
              <CardHeader className="mb-2">
                {/* Avatar + title - center on mobile, inline on sm+ */}
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:space-x-3">
                  <Image
                    src={c.image ?? "/images/user.jpg"}
                    alt={c.name}
                    width={40}
                    height={40}
                    unoptimized
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      if (img && img.src.indexOf("/images/user.jpg") === -1) img.src = "/images/user.jpg"
                    }}
                    className="rounded-full object-cover"
                  />

                  <div className="mt-2 sm:mt-0">
                    <CardTitle className="text-lg text-[#1c1c1c]"><Link href={`/cms/customers/${c.id}/view`}>{c.name}</Link></CardTitle>
                    <CardDescription className="text-sm text-[#4a4a4a] truncate">{c.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="text-center sm:text-left">
                {c.businessName && (
                  <p className="text-sm text-[#4a4a4a]">
                    Business Name: <span className="font-medium text-[#be965b]">{c.businessName}</span>
                  </p>
                )}
                {c.businessType && (
                  <p className="text-sm text-[#4a4a4a] mt-1">
                    Business Type: <span className="font-medium text-[#be965b]">{c.businessType}</span>
                  </p>
                )}
                {c.phone && (
                  <p className="text-sm text-[#4a4a4a] mt-1">Phone: {c.phone}</p>
                )}
              </CardContent>

              <CardFooter className="flex justify-center sm:justify-start">
                <CustomerActions customer={c} />
              </CardFooter>
            </Card>
          </div>
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
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { CustomerActions } from "./CustomerActions";

// interface Props {
//   customers: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     businessName?: string | null;
//     businessType?: string | null;
//   }[];
// }

// const ITEMS_PER_PAGE = 8;

// export function CustomerCard({ customers }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

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
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {currentRows.map((c) => (
//           <Card
//             key={c.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader>
//               <CardTitle className="text-lg text-[#1c1c1c]">{c.name}</CardTitle>
//               <CardDescription className="text-sm text-[#4a4a4a]">
//                 {c.email}
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               {c.businessName && (
//                 <p className="text-sm text-[#4a4a4a]">
//                   Business Name:{" "}
//                   <span className="font-medium text-[#be965b]">{c.businessName}</span>
//                 </p>
//               )}
//               {c.businessType && (
//                 <p className="text-sm text-[#4a4a4a] mt-1">
//                   Business Type:{" "}
//                   <span className="font-medium text-[#be965b]">{c.businessType}</span>
//                 </p>
//               )}
//               {c.phone && (
//                 <p className="text-sm text-[#4a4a4a] mt-1">Phone: {c.phone}</p>
//               )}
//             </CardContent>

//             <CardFooter>
//               <CustomerActions customer={c} />
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






// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { CustomerActions } from "./CustomerActions";

// interface Props {
//   customer: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     businessName?: string | null;
//     businessType?: string | null;
//   };
// }

// export function CustomerCard({ customer }: Props) {
//   return (
//     <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-lg text-[#1c1c1c]">{customer.name}</CardTitle>
//         <CardDescription className="text-sm text-[#4a4a4a]">
//           {customer.email}
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         {customer.businessName && (
//           <p className="text-sm text-[#4a4a4a]">
//             Business Name: <span className="font-medium text-[#be965b]">{customer.businessName}</span>
//           </p>
//         )}
//         {customer.businessType && (
//           <p className="text-sm text-[#4a4a4a] mt-1">
//             Business Type: <span className="font-medium text-[#be965b]">{customer.businessType}</span>
//           </p>
//         )}
//         {customer.phone && (
//           <p className="text-sm text-[#4a4a4a] mt-1">Phone: {customer.phone}</p>
//         )}
//       </CardContent>

//       <CardFooter>
//         <CustomerActions customer={customer} />
//       </CardFooter>
//     </Card>
//   );
// }
