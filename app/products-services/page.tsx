// app/products-services/page.tsx
import PageHero from "@/app/common/PageHero";
import { getProducts } from "@/app/products-services/actions";
import Products from "./sections/Products";
import Services from "./sections/Services";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = (await getProducts()) ?? [];

  return (
    <>
      <PageHero
        title="Products & Services"
        description="Discover our wide range of premium beverages and professional services."
        backgroundImage="/images/banners/products.jpg"
      />

      <Products products={products} /> {/* Pass products to the Products component */}
      <Services />
    </>
  );
}




// // app/products-services/page.tsx
// "use client";

// import PageHero from "@/app/common/PageHero";
// import { getProducts } from "@/app/products-services/actions";
// import Products from "./sections/Products";
// import Services from "./sections/Services";

// export default async function ProductsPage() {
//   const products = await getProducts(); // Fetch products from the database

//   return (
//     <>
//       <PageHero
//         title="Products & Services"
//         description="Discover our wide range of premium beverages and professional services."
//         backgroundImage="/images/banners/products.jpg"
//       />

//       <Products products={products} /> {/* Pass products to the Products component */}
//       <Services />
//     </>
//   );
// }



// "use client";

// import PageHero from "@/app/common/PageHero";
// import { getProducts } from "@/app/products-services/sections/actions";
// import Products from "./sections/Products";
// import Services from "./sections/Services";

// export default async function ProductsPage() {
//   const products = await getProducts(); // Fetch products from the database

//   return (
//     <>
//       <PageHero
//         title="Products & Services"
//         description="Discover our wide range of premium beverages and professional services."
//         backgroundImage="/images/banners/products.jpg"
//       />

//       <Products products={products} /> {/* Pass products to the Products component */}
//       <Services />
//     </>
//   );
// }




// "use client";

// import PageHero from "@/app/common/PageHero";
// import Products from "./sections/Products";
// import Services from "./sections/Services";

// export default function ProductsPage() {
//   return (
//     <>
//       <PageHero
//         title="Products & Services"
//         description="Discover our wide range of premium beverages and professional services."
//         backgroundImage="/images/banners/products.jpg"
//       />

//       <Products />
//       <Services />
//     </>
//   );
// }
