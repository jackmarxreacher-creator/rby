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
import Image from "next/image";
import { UserActions } from "./UserActions";

interface Props {
  users: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EDITOR" | "VIEWER";
    phoneNumber?: string | null;
    image?: string | null;
  }[];
}

const ITEMS_PER_PAGE = 8; // 2×4 grid

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
      {/* ----  GRID  ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentRows.map((user) => (
          <Card
            key={user.id}
            className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Image
                  src={user.image || "/images/user.jpg"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg text-[#1c1c1c]">
                    {user.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-[#4a4a4a]">
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-[#4a4a4a]">
                Role:{" "}
                <span className="font-medium text-[#be965b]">{user.role}</span>
              </p>
              {user.phoneNumber && (
                <p className="text-sm text-[#4a4a4a] mt-1">
                  Phone: {user.phoneNumber}
                </p>
              )}
            </CardContent>

            <CardFooter>
              <UserActions user={user} />
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

