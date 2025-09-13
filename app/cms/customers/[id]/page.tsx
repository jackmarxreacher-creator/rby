import { notFound } from "next/navigation";
import { getCustomer } from "../actions";
import { EditCustomerClient } from "./EditCustomerClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCustomerPage({ params }: PageProps) {
  const { id } = await params; // await the promise
  const customer = await getCustomer(id);
  if (!customer) notFound();

  return <EditCustomerClient customer={customer} />;
}




// import { notFound } from "next/navigation";
// import { getCustomer } from "../actions";
// import { EditCustomerClient } from "./EditCustomerClient";

// interface PageProps {
//   params: { id: string };
// }

// export default async function EditCustomerPage({ params }: PageProps) {
//   const customer = await getCustomer(params.id);
//   if (!customer) notFound();

//   return <EditCustomerClient customer={customer} />;
// }





// import { prisma } from "@/lib/prisma";
// import CustomerForm from "../_components/CustomerForm";
// import { updateCustomer } from "../actions";
// import { useRouter } from "next/navigation";

// interface PageProps {
//   params: { id: string };
// }

// export default async function EditCustomerPage({ params }: PageProps) {
//   const { id } = params;
//   const customer = await prisma.customer.findUnique({ where: { id } });
//   // Since this is a server component, you may want to wrap with a client component
//   // or handle router.push differently per your app design

//   const handleSave = async (data: FormData) => {
//     await updateCustomer(id, data);
//   };

//   return (
//     <div className="p-8">
//       <CustomerForm initialCustomer={customer} onSave={handleSave} />
//     </div>
//   );
// }




// import { prisma } from "@/lib/prisma";
// import CustomerForm from "../_components/CustomerForm";
// import { updateCustomer } from "../actions";
// import { useRouter } from "next/navigation";

// interface PageProps {
//   params: { id: string };
// }

// export default async function EditCustomerPage({ params }: PageProps) {
//   const { id } = params;
//   const customer = await prisma.customer.findUnique({ where: { id } });

//   // For client component and router navigation, convert to client if needed or handle routing differently

//   const handleSubmit = async (data: any) => {
//     await updateCustomer(id, data);
//   };

//   return (
//     <div className="p-8">
//       <CustomerForm initialCustomer={customer} onSubmit={handleSubmit} />
//     </div>
//   );
// }
