// app/cms/products/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import { ProductForm } from "../_components/ProductForm";
import { redirect } from "next/navigation";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next.js 15: params is a Promise

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      category: true,
      size: true,
      wholesalePrice: true,
      retailPrice: true,
      description: true,
      discount: true,
      image: true,
      createdAt: true,   // ← satisfy ProductFormProps
      updatedAt: true,
    },
  });

  if (!product) redirect("/cms/products");

  const boundUpdateProduct = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initial={product} onSave={boundUpdateProduct} />
    </div>
  );
}





// // app/cms/products/[id]/page.tsx

// import { prisma } from "@/lib/prisma";
// import { ProductForm } from "../_components/ProductForm"; // Ensure path is correct
// import { redirect } from "next/navigation";
// import { updateProduct } from "../actions";

// export default async function EditProductPage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Fetch the product by ID using Prisma
//   const product = await prisma.product.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       category: true,
//       size: true,
//       wholesalePrice: true,
//       retailPrice: true,
//       description: true,
//       discount: true,
//       image: true,
//     },
//   });

//   if (!product) {
//     // Redirect to product list if not found
//     redirect("/cms/products");
//   }

//   // Bind product ID to updateProduct server action
//   const boundUpdateProduct = updateProduct.bind(null, id);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
//       <ProductForm initial={product} onSave={boundUpdateProduct} />
//     </div>
//   );
// }
