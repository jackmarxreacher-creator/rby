import { Suspense } from "react";
import { getProducts } from "./actions";
import { ProductCard } from "./_components/ProductCard";
import { ProductTable } from "./_components/ProductTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ViewToggle } from "./_components/ViewToggle";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams; // ✅ await
  const products = await getProducts();
  const currentView = view === "table" ? "table" : "card";

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]">Products</h1>

        <div className="flex items-center gap-4">
          <ViewToggle current={currentView} />
          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/products/new">Add Product</Link>
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No products yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/products/new">Create your first product</Link>
          </Button>
        </div>
      ) : currentView === "table" ? (
        <ProductTable products={products} />
      ) : (
        <ProductCard products={products} />
      )}
    </div>
  );
}





// import { Suspense } from "react";
// import { getProducts } from "./actions";
// import { ProductCard } from "./_components/ProductCard";
// import { ProductTable } from "./_components/ProductTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "./_components/ViewToggle";

// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams; // ✅ await
//   const products = await getProducts();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Products</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/products/new">Add Product</Link>
//           </Button>
//         </div>
//       </div>

//       {products.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No products yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/products/new">Create your first product</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <ProductTable products={products} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

