"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;
const categories = [
  "All", "Beer", "Spirits", "Cocktails", "Wine", "Juice",
  "Liqueur", "Mocktail", "SoftDrink", "Water"
];

interface Props {
  products: any[];
}

/* helper – returns a thumbnail URL for YouTube embeds */
const thumb = (src: string) =>
  src.includes("youtube.com/embed/")
    ? src.replace("/embed/", "/vi/") + "/0.jpg"
    : src;

export default function Products({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ----------  search + category filter  ---------- */
  const filteredProducts = useMemo(() => {
    let list = products;

    // category
    if (selectedCategory !== "All") {
      list = list.filter((p) =>
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedCategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
          Our Products
        </h2>

        {/* =====  SEARCH + CATEGORY FILTER  ===== */}
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-6 md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#be965b] text-white"
                    : "bg-[#f3ede5] text-gray-800 hover:bg-[#be965b]/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* =====  PRODUCTS GRID  ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
            >
              <div className="relative w-full h-56">
                <Image
                  src={thumb(product.image)} // <- auto YouTube thumb
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                {product.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-[#be965b] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#be965b] mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>

                <p className="text-sm text-gray-700">
                  Size: <span className="font-medium">{product.size}</span>
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-sm text-gray-500">Wholesale</p>
                    <p className="text-lg font-bold text-[#1c1c1c]">
                      GHS {product.wholesalePrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Retail</p>
                    <p className="text-lg font-bold text-[#7b2e2e]">
                      GHS {product.retailPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="default" className="w-full">
                    Order Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {currentProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No products found.
            </p>
          )}
        </div>

        {/* =====  PAGINATION  ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Previous
            </Button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="default"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}






// // app/products-services/sections/Products.tsx
// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 12;

// // ✅ Categories (can be expanded later or made dynamic)
// const categories = ["All", "Beer", "Spirits", "Cocktails", "Wine", "Juice","Liqueur", "Mocktail","SoftDrink", "Water"];

// interface Props {
//   products: any[]; // Accept products as a prop
// }

// export default function Products({ products }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // ✅ Filtering
//   const filteredProducts = useMemo(() => {
//     let list = products;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       list = list.filter((p) =>
//         p.description.toLowerCase().includes(selectedCategory.toLowerCase())
//       );
//     }

//     // Filter by search
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.description.toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [searchQuery, selectedCategory, products]);

//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

//   const currentProducts = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, filteredProducts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Our Products
//         </h2>

//         {/* ✅ Search & Category Filters */}
//         <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-6 md:flex-row md:items-center md:justify-between gap-6 mb-10">
//           {/* Search */}
//           <input
//             type="search"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />

//           {/* Categories */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => {
//                   setSelectedCategory(cat);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                   selectedCategory === cat
//                     ? "bg-[#be965b] text-white"
//                     : "bg-[#f3ede5] text-gray-800 hover:bg-[#be965b]/60 hover:text-white"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {currentProducts.map((product, index) => (
//             <motion.div
//               key={product.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
//             >
//               {/* Product Image + Discount */}
//               <div className="relative w-full h-56">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain p-4"
//                 />
//                 {product.discount > 0 && (
//                   <div className="absolute top-3 right-3 bg-[#be965b] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {product.discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-[#be965b] mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {product.description}
//                 </p>

//                 <p className="text-sm text-gray-700">
//                   Size: <span className="font-medium">{product.size}</span>
//                 </p>

//                 <div className="flex items-center justify-between mt-3">
//                   <div>
//                     <p className="text-sm text-gray-500">Wholesale</p>
//                     <p className="text-lg font-bold text-[#1c1c1c]">
//                       GHS {product.wholesalePrice}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Retail</p>
//                     <p className="text-lg font-bold text-[#7b2e2e]">
//                       GHS {product.retailPrice}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <Button variant="default" className="w-full">
//                     Order Now
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {currentProducts.length === 0 && (
//             <p className="col-span-full text-center text-gray-600">
//               No products found.
//             </p>
//           )}
//         </div>

//         {/* ✅ Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-4 mt-12">
//             <Button
//               variant="outline"
//               disabled={currentPage === 1}
//               onClick={() => goToPage(currentPage - 1)}
//             >
//               Previous
//             </Button>

//             <span className="font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="default"
//               disabled={currentPage === totalPages}
//               onClick={() => goToPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }






// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 12;

// // ✅ Categories (can be expanded later or made dynamic)
// const categories = ["All", "Beer", "Spirits", "Cocktails", "Bitters", "Non-Alcoholic"];

// interface Props {
//   products: any[]; // Accept products as a prop
// }

// export default function Products({ products }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // ✅ Filtering
//   const filteredProducts = useMemo(() => {
//     let list = products;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       list = list.filter((p) =>
//         p.description.toLowerCase().includes(selectedCategory.toLowerCase())
//       );
//     }

//     // Filter by search
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.description.toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [searchQuery, selectedCategory, products]);

//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

//   const currentProducts = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, filteredProducts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Our Products
//         </h2>

//         {/* ✅ Search & Category Filters */}
//         <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-6 md:flex-row md:items-center md:justify-between gap-6 mb-10">
//           {/* Search */}
//           <input
//             type="search"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />

//           {/* Categories */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => {
//                   setSelectedCategory(cat);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                   selectedCategory === cat
//                     ? "bg-[#be965b] text-white"
//                     : "bg-[#f3ede5] text-gray-800 hover:bg-[#be965b]/60 hover:text-white"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {currentProducts.map((product, index) => (
//             <motion.div
//               key={product.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
//             >
//               {/* Product Image + Discount */}
//               <div className="relative w-full h-56">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain p-4"
//                 />
//                 {product.discount > 0 && (
//                   <div className="absolute top-3 right-3 bg-[#be965b] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {product.discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-[#be965b] mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {product.description}
//                 </p>

//                 <p className="text-sm text-gray-700">
//                   Size: <span className="font-medium">{product.size}</span>
//                 </p>

//                 <div className="flex items-center justify-between mt-3">
//                   <div>
//                     <p className="text-sm text-gray-500">Wholesale</p>
//                     <p className="text-lg font-bold text-[#1c1c1c]">
//                       GHS {product.wholesalePrice}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Retail</p>
//                     <p className="text-lg font-bold text-[#7b2e2e]">
//                       GHS {product.retailPrice}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <Button variant="default" className="w-full">
//                     Order Now
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {currentProducts.length === 0 && (
//             <p className="col-span-full text-center text-gray-600">
//               No products found.
//             </p>
//           )}
//         </div>

//         {/* ✅ Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-4 mt-12">
//             <Button
//               variant="outline"
//               disabled={currentPage === 1}
//               onClick={() => goToPage(currentPage - 1)}
//             >
//               Previous
//             </Button>

//             <span className="font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="default"
//               disabled={currentPage === totalPages}
//               onClick={() => goToPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useMemo } from "react";
// import { products } from "@/data/products";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 12;

// // ✅ Categories (can be expanded later or made dynamic)
// const categories = ["All", "Beer", "Spirits", "Cocktails", "Bitters", "Non-Alcoholic"];

// export default function Products() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // ✅ Filtering
//   const filteredProducts = useMemo(() => {
//     let list = products;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       list = list.filter((p) =>
//         p.description.toLowerCase().includes(selectedCategory.toLowerCase())
//       );
//     }

//     // Filter by search
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.description.toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [searchQuery, selectedCategory]);

//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

//   const currentProducts = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, filteredProducts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Our Products
//         </h2>

//         {/* ✅ Search & Category Filters */}
//         <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-6 md:flex-row md:items-center md:justify-between gap-6 mb-10">
//           {/* Search */}
//           <input
//             type="search"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />

//           {/* Categories */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => {
//                   setSelectedCategory(cat);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                   selectedCategory === cat
//                     ? "bg-[#be965b] text-white"
//                     : "bg-[#f3ede5] text-gray-800 hover:bg-[#be965b]/60 hover:text-white"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {currentProducts.map((product, index) => (
//             <motion.div
//               key={product.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
//             >
//               {/* Product Image + Discount */}
//               <div className="relative w-full h-56">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain p-4"
//                 />
//                 {product.discount > 0 && (
//                   <div className="absolute top-3 right-3 bg-[#be965b] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {product.discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-[#be965b] mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {product.description}
//                 </p>

//                 <p className="text-sm text-gray-700">
//                   Size: <span className="font-medium">{product.size}</span>
//                 </p>

//                 <div className="flex items-center justify-between mt-3">
//                   <div>
//                     <p className="text-sm text-gray-500">Wholesale</p>
//                     <p className="text-lg font-bold text-[#1c1c1c]">
//                       GHS {product.wholesalePrice}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Retail</p>
//                     <p className="text-lg font-bold text-[#7b2e2e]">
//                       GHS {product.retailPrice}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <Button variant="default" className="w-full">
//                     Order Now
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {currentProducts.length === 0 && (
//             <p className="col-span-full text-center text-gray-600">
//               No products found.
//             </p>
//           )}
//         </div>

//         {/* ✅ Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-4 mt-12">
//             <Button
//               variant="outline"
//               disabled={currentPage === 1}
//               onClick={() => goToPage(currentPage - 1)}
//             >
//               Previous
//             </Button>

//             <span className="font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="default"
//               disabled={currentPage === totalPages}
//               onClick={() => goToPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useMemo } from "react";
// import { products } from "@/data/products";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 12;

// export default function Products() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

//   const currentProducts = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return products.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-[#be965b] mb-10 text-center">
//           Our Products
//         </h2>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {currentProducts.map((product, index) => (
//             <motion.div
//               key={product.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition"
//             >
//               {/* Product Image + Discount */}
//               <div className="relative w-full h-56">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-contain p-4"
//                 />
//                 {product.discount > 0 && (
//                   <div className="absolute top-3 right-3 bg-[#be965b] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {product.discount}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-[#be965b] mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {product.description}
//                 </p>

//                 <p className="text-sm text-gray-700">
//                   Size: <span className="font-medium">{product.size}</span>
//                 </p>

//                 <div className="flex items-center justify-between mt-3">
//                   <div>
//                     <p className="text-sm text-gray-500">Wholesale</p>
//                     <p className="text-lg font-bold text-[#1c1c1c]">
//                       GHS {product.wholesalePrice}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Retail</p>
//                     <p className="text-lg font-bold text-[#7b2e2e]">
//                       GHS {product.retailPrice}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <Button variant="default" className="w-full">
//                     Order Now
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-4 mt-12">
//             <Button
//               variant="outline"
//               disabled={currentPage === 1}
//               onClick={() => goToPage(currentPage - 1)}
//             >
//               Previous
//             </Button>

//             <span className="font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="default"
//               disabled={currentPage === totalPages}
//               onClick={() => goToPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
