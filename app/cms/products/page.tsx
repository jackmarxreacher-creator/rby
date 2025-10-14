"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "./_components/ProductCard";
import { ProductTable } from "./_components/ProductTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ViewToggle } from "./_components/ViewToggle";
import { labelForCategory } from "@/lib/category";

type Product = any;

export default function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"card" | "table">("card");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    const usp = new URLSearchParams();
    if (productName) usp.set("productName", productName);
    if (category) usp.set("category", category);
    const res = await fetch(`/api/products?${usp.toString()}`);
    const json = await res.json();
    setProducts(Array.isArray(json) ? json : []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/products/categories");
      const json = await res.json();
      setCategories(Array.isArray(json) ? json : []);
    } catch (err) {
      setCategories([]);
    }
  };

  useEffect(() => {
    // sync view with URL param
    const v = searchParams.get("view");
    setView(v === "table" ? "table" : "card");
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName, category, searchParams]);

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 shadow-lg mb-8 gap-3">
        <h1 className="text-3xl font-bold text-[#1c1c1c]"></h1>

        <div className="flex flex-wrap items-center gap-3">
          <ViewToggle current={view} />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-2 py-1 text-sm max-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {labelForCategory(c)}
              </option>
            ))}
          </select>
          <input
            className="border rounded px-2 py-1 text-sm max-w-[220px]"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/products/new">Add Product</Link>
          </Button>
        </div>
      </div>

      {products.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No products match filters.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/products/new">Create your first product</Link>
          </Button>
        </div>
      ) : view === "table" ? (
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

