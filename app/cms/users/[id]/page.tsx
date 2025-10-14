// app/cms/users/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import UserEditFormWrapper from "../_components/UserEditFormWrapper";
import { redirect } from "next/navigation";
import { updateUser } from "../actions";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: "ADMIN" | "EDITOR" | "MANAGER" | "STAFF";
  department?:
    | "Administration"
    | "Finance"
    | "HR"
    | "Sales"
    | "Warehouse";
}

export default async function UserEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ← Next.js 15: await the promise

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
      department: true,
    },
  });

  if (!user) redirect("/cms/users");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserEditFormWrapper id={id} initial={user} />
    </div>
  );
}




// // app/cms/users/[id]/page.tsx

// import { prisma } from "@/lib/prisma";
// import { UserForm } from "../_components/UserForm"; // Adjust import if needed
// import { redirect } from "next/navigation";
// import { updateUser } from "../actions";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string | null;
//   role: "ADMIN" | "EDITOR" | "VIEWER";
// }

// export default async function UserEditPage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Fetch user by id
//   const user = await prisma.user.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phoneNumber: true,
//       role: true,
//     },
//   });

//   if (!user) {
//     // Redirect if user not found
//     redirect("/cms/users");
//   }

//   // Bind user ID to updateUser action as first argument
//   const boundUpdateUser = updateUser.bind(null, id);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit User</h1>
//       <UserForm initial={user as User} onSave={boundUpdateUser} />
//     </div>
//   );
// }

