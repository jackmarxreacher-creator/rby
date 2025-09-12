import { Suspense } from "react";
import { getUsers } from "./actions";
import { UserCard } from "./_components/UserCard";
import { UserTable } from "./_components/UserTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ViewToggle } from "@/components/ui/ViewToggle";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const users = await getUsers();
  const currentView = view === "table" ? "table" : "card";

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]">Users & Roles</h1>

        <div className="flex items-center gap-4">
          <ViewToggle current={currentView} basePath="/cms/users" />
          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/users/new">Add User</Link>
          </Button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No users yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/users/new">Create your first user</Link>
          </Button>
        </div>
      ) : currentView === "table" ? (
        <UserTable users={users} />
      ) : (
        <UserCard users={users} />
      )}
    </div>
  );
}                                                                         




// import { Suspense } from "react";
// import { getUsers } from "./actions";
// import { UserCard } from "./_components/UserCard";
// import { UserTable } from "./_components/UserTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "@/components/ui/ViewToggle";

// export default async function UsersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const users = await getUsers();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Users & Roles</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/users" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/users/new">Add User</Link>
//           </Button>
//         </div>
//       </div>

//       {users.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No users yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/users/new">Create your first user</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <UserTable users={users} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {users.map((u) => (
//             <UserCard key={u.id} user={u} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import { Suspense } from "react";
// import { getUsers } from "./actions";
// import { UserCard } from "./_components/UserCard";
// import { UserTable } from "./_components/UserTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "./_components/ViewToggle";

// export default async function UsersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const users = await getUsers();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Users & Roles</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/users/new">Add User</Link>
//           </Button>
//         </div>
//       </div>

//       {users.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No users yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/users/new">Create your first user</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <UserTable users={users} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {users.map((u) => (
//             <UserCard key={u.id} user={u} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }