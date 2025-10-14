"use client";

import Image from "next/image";
import { UserActions } from "./UserActions";
import { useMemo, useState } from "react";

interface Props {
  users: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EDITOR" | "MANAGER" | "STAFF";
    department?: "Administration" | "Finance" | "HR" | "Sales" | "Warehouse";
    phoneNumber?: string | null;
    image?: string | null;
  }[];
}

const ITEMS_PER_PAGE = 8;

export function UserCard({ users }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, users]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      {/* ----------  Responsive Grid  ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRows.map((user) => (
          <div
            key={user.id}
            className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-lg text-gray-900 overflow-hidden"
          >
            {/* ----  Banner  ---- */}
            <div className="h-32 overflow-hidden">
              <Image
                src="/images/banners/rby_hero2.webp"
                alt="banner"
                width={800}
                height={200}
                className="object-cover object-top w-full h-full"
              />
            </div>

            {/* ----  Avatar  ---- */}
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <Image
                src={user.image || "/images/user.jpg"}
                alt={user.name}
                width={128}
                height={128}
                className="object-cover object-center w-full h-full"
              />
            </div>

            {/* ----  Name / Role  ---- */}
            <div className="text-center mt-2">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.role} — {user.department ?? "—"}</p>
            </div>

            {/* ----  Actions  ---- */}
            <div className="p-4 border-t mx-8 mt-2 flex gap-2 justify-center">
              <UserActions user={user} />
            </div>
          </div>
        ))}
      </div>

      {/* ----------  Pagination (unchanged)  ---------- */}
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

// import Image from "next/image";
// import { UserActions } from "./UserActions";
// import { useMemo, useState } from "react";

// interface Props {
//   users: {
//     id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "EDITOR" | "VIEWER";
//     phoneNumber?: string | null;
//     image?: string | null;
//   }[];
// }

// const ITEMS_PER_PAGE = 8;

// export function UserCard({ users }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return users.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, users]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {/* ----  GRID  ---- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {currentRows.map((user) => (
//           <div
//             key={user.id}
//             className="max-w-sm w-full mx-auto bg-[#fcfbf8] shadow-xl rounded-lg text-gray-900 overflow-hidden"
//           >
//             {/* ----  Banner  ---- */}
//             <div className="h-32 overflow-hidden">
//               <Image
//                 src="/images/banners/rby_hero2.webp"
//                 alt="banner"
//                 width={800}
//                 height={200}
//                 className="object-cover object-top w-full h-full"
//               />
//             </div>

//             {/* ----  Avatar  ---- */}
//             <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
//               <Image
//                 src={user.image || "/images/user.jpg"}
//                 alt={user.name}
//                 width={128}
//                 height={128}
//                 className="object-cover object-center w-full h-full"
//               />
//             </div>

//             {/* ----  Name / Role  ---- */}
//             <div className="text-center mt-2">
//               <h2 className="font-semibold text-lg">{user.name}</h2>
//               <p className="text-gray-500 text-sm">{user.role}</p>
//             </div>

//             {/* ----  Actions  ---- */}
//             <div className="p-4 border-t mx-8 mt-2 flex gap-2 justify-center">
//               <UserActions user={user} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ----  Pagination (unchanged)  ---- */}
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
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import Image from "next/image";
// import { UserActions } from "./UserActions";

// interface Props {
//   users: {
//     id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "EDITOR" | "VIEWER";
//     phoneNumber?: string | null;
//     image?: string | null;
//   }[];
// }

// const ITEMS_PER_PAGE = 8; // 2×4 grid

// export function UserCard({ users }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return users.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, users]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {/* ----  GRID  ---- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {currentRows.map((user) => (
//           <Card
//             key={user.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Image
//                   src={user.image || "/images/user.jpg"}
//                   alt={user.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full object-cover"
//                 />
//                 <div>
//                   <CardTitle className="text-lg text-[#1c1c1c]">
//                     {user.name}
//                   </CardTitle>
//                   <CardDescription className="text-sm text-[#4a4a4a]">
//                     {user.email}
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <p className="text-sm text-[#4a4a4a]">
//                 Role:{" "}
//                 <span className="font-medium text-[#be965b]">{user.role}</span>
//               </p>
//               {user.phoneNumber && (
//                 <p className="text-sm text-[#4a4a4a] mt-1">
//                   Phone: {user.phoneNumber}
//                 </p>
//               )}
//             </CardContent>

//             <CardFooter>
//               <UserActions user={user} />
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
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import Image from "next/image";
// import { UserActions } from "./UserActions";

// interface Props {
//   users: {
//     id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "EDITOR" | "VIEWER";
//     phoneNumber?: string | null;
//     image?: string | null;
//   }[];
// }

// const ITEMS_PER_PAGE = 8; // 3×3 grid looks nice

// export function UserCard({ users }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return users.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, users]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {/* ----  GRID  ---- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentRows.map((user) => (
//           <Card
//             key={user.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <Image
//                   src={user.image || "/images/user.jpg"}
//                   alt={user.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full object-cover"
//                 />
//                 <div>
//                   <CardTitle className="text-lg text-[#1c1c1c]">
//                     {user.name}
//                   </CardTitle>
//                   <CardDescription className="text-sm text-[#4a4a4a]">
//                     {user.email}
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <p className="text-sm text-[#4a4a4a]">
//                 Role:{" "}
//                 <span className="font-medium text-[#be965b]">{user.role}</span>
//               </p>
//               {user.phoneNumber && (
//                 <p className="text-sm text-[#4a4a4a] mt-1">
//                   Phone: {user.phoneNumber}
//                 </p>
//               )}
//             </CardContent>

//             <CardFooter>
//               <UserActions user={user} />
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
// import Image from "next/image";
// import { UserActions } from "./UserActions";

// interface Props {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "EDITOR" | "VIEWER";
//     phoneNumber?: string | null;
//     image?: string | null;
//   };
// }

// export function UserCard({ user }: Props) {
//   return (
//     <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg">
//       <CardHeader>
//         <div className="flex items-center gap-3">
//           <Image
//             src={user.image || "/images/user.jpg"}
//             alt={user.name}
//             width={48}
//             height={48}
//             className="rounded-full object-cover"
//           />
//           <div>
//             <CardTitle className="text-lg text-[#1c1c1c]">{user.name}</CardTitle>
//             <CardDescription className="text-sm text-[#4a4a4a]">
//               {user.email}
//             </CardDescription>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <p className="text-sm text-[#4a4a4a]">
//           Role: <span className="font-medium text-[#be965b]">{user.role}</span>
//         </p>
//         {user.phoneNumber && (
//           <p className="text-sm text-[#4a4a4a] mt-1">
//             Phone: {user.phoneNumber}
//           </p>
//         )}
//       </CardContent>

//       <CardFooter>
//         <UserActions user={user} />
//       </CardFooter>
//     </Card>
//   );
// }

