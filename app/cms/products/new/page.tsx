import { createProduct } from "../actions";
import { ProductFormWrapper } from "../_components/ProductFormWrapper";
import { getAuth } from "@/lib/auth"; // server-side Better-Auth helper
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  const session = await getAuth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Product</h1>
  <ProductFormWrapper action={createProduct} />
    </div>
  );
}




// import { createProduct } from "../actions";
// import { ProductForm } from "../_components/ProductForm";

// export default async function NewProductPage() {
//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Product</h1>
//       <ProductForm onSave={createProduct} />
//     </div>
//   );
// }