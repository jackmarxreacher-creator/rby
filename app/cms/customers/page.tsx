import { Suspense } from "react";
import { getCustomers } from "./actions";
import  CustomerCard  from "./_components/CustomerCard";
import { CustomersTable } from "./_components/CustomersTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ViewToggle } from "@/components/ui/ViewToggle";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const customers = await getCustomers();
  const currentView = view === "table" ? "table" : "card";

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]">Customers</h1>

        <div className="flex items-center gap-4">
          <ViewToggle current={currentView} basePath="/cms/customers" />
          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/customers/new">Add Customer</Link>
          </Button>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No customers yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/customers/new">Create your first customer</Link>
          </Button>
        </div>
      ) : currentView === "table" ? (
        <CustomersTable customers={customers} />
      ) : (
        <CustomerCard customers={customers} />
      )}
    </div>
  );
}





// import { Suspense } from "react";
// import { getCustomers } from "./actions";
// import { CustomerCard } from "./_components/CustomerCard";
// import { CustomersTable } from "./_components/CustomersTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "@/components/ui/ViewToggle";

// export default async function CustomersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const customers = await getCustomers();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Customers</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/customers" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/customers/new">Add Customer</Link>
//           </Button>
//         </div>
//       </div>

//       {customers.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No customers yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/customers/new">Create your first customer</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <CustomersTable customers={customers} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {customers.map((c) => (
//             <CustomerCard key={c.id} customer={c} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { getCustomers } from "./actions";
// import { CustomersTable } from "./_components/CustomersTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default async function CustomersPage() {
//   const customers = await getCustomers();

//   return (
//     <section className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Customers</h1>
//         <Button>
//           <Link href="/cms/customers/new">Add Customer</Link>
//         </Button>
//       </div>
//       <CustomersTable customers={customers} />
//     </section>
//   );
// }
