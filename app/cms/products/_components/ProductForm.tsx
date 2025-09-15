"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Product, Category } from "@prisma/client"; // ← import types

interface Props {
  initial?: Product;
  onSave: (data: FormData) => Promise<void>;
}

export function ProductForm({ initial, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await onSave(form);
    setLoading(false);
    router.push("/cms/products");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Back arrow */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
      >
        <IoArrowBack size={16} />
        Back
      </Button>

      {/* Name & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#1c1c1c]">Name</Label>
          <Input
            name="name"
            defaultValue={initial?.name}
            required
            className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
          />
        </div>
        <div>
          <Label className="text-[#1c1c1c]">Category</Label>
          <select
            name="category"
            required
            defaultValue={initial?.category ?? ""}
            className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2 text-sm focus:border-[#be965b] focus:ring-[#be965b]"
          >
            <option value="" disabled>
              Select Product Category
            </option>
            {["Beer", "Wine", "Spirits", "Liqueur", "Cocktail", "Soft Drink", "Juice", "Mocktail", "Water"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image, Size & Discount */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-[#1c1c1c]">Image</Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            className="border-[#cccccc] file:bg-[#be965b] file:text-black file:font-medium"
          />
        </div>
        <div>
          <Label className="text-[#1c1c1c]">Size</Label>
          <Input
            name="size"
            defaultValue={initial?.size}
            required
            className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
          />
        </div>
        <div>
          <Label className="text-[#1c1c1c]">Discount %</Label>
          <Input
            name="discount"
            type="number"
            defaultValue={initial?.discount ?? 0}
            className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
          />
        </div>
      </div>

      {/* Wholesale & Retail */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[#1c1c1c]">Wholesale Price(GHS)</Label>
          <Input
            name="wholesalePrice"
            type="number"
            defaultValue={initial?.wholesalePrice}
            required
            className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
          />
        </div>
        <div>
          <Label className="text-[#1c1c1c]">Retail Price(GHS)</Label>
          <Input
            name="retailPrice"
            type="number"
            defaultValue={initial?.retailPrice}
            required
            className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Label className="text-[#1c1c1c]">Description</Label>
        <Textarea
          name="description"
          /* ✅ FIX: coerce null → empty string */
          defaultValue={initial?.description ?? ""}
          className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
        />
      </div>

      {/* Action row */}
      <div className="flex gap-3">
        <Button
          type="submit"
          size="sm"
          disabled={loading}
          className="bg-[#be965b] hover:bg-[#a88248] text-black"
        >
          {loading ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => router.back()}
          className="border-[#cccccc] text-[#4a4a4a] hover:bg-[#f3ede5]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import type { Product, Category } from "@prisma/client"; // ← import types

// interface Props {
//   initial?: Product;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function ProductForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);
//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/products");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       {/* Back arrow */}
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       {/* Name & Category */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Name</Label>
//           <Input
//             name="name"
//             defaultValue={initial?.name}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Category</Label>
//           <select
//             name="category"
//             required
//             defaultValue={initial?.category ?? ""}
//             className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2 text-sm focus:border-[#be965b] focus:ring-[#be965b]"
//           >
//             <option value="" disabled>
//               Select Product Category
//             </option>
//             {["Beer", "Wine", "Spirits", "Liqueur", "Cocktail", "Soft Drink", "Juice", "Mocktail", "Water"].map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Image, Size & Discount */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Image</Label>
//           <Input
//             type="file"
//             name="image"
//             accept="image/*"
//             className="border-[#cccccc] file:bg-[#be965b] file:text-black file:font-medium"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Size</Label>
//           <Input
//             name="size"
//             defaultValue={initial?.size}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Discount %</Label>
//           <Input
//             name="discount"
//             type="number"
//             defaultValue={initial?.discount ?? 0}
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       {/* Wholesale & Retail */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Wholesale Price(GHS)</Label>
//           <Input
//             name="wholesalePrice"
//             type="number"
//             defaultValue={initial?.wholesalePrice}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Retail Price(GHS)</Label>
//           <Input
//             name="retailPrice"
//             type="number"
//             defaultValue={initial?.retailPrice}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <Label className="text-[#1c1c1c]">Description</Label>
//         <Textarea
//           name="description"
//           defaultValue={initial?.description}
//           className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//         />
//       </div>

//       {/* Action row */}
//       <div className="flex gap-3">
//         <Button
//           type="submit"
//           size="sm"
//           disabled={loading}
//           className="bg-[#be965b] hover:bg-[#a88248] text-black"
//         >
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a] hover:bg-[#f3ede5]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }






// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// interface Props {
//   initial?: Product;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function ProductForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const categories = [
//     "Beer", "Wine", "Spirits", "Liqueur",
//     "Cocktail", "Soft Drink", "Juice", "Mocktail", "Water",
//   ];

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);
//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/products");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       {/* Back arrow */}
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       {/* Name & Category */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Name</Label>
//           <Input
//             name="name"
//             defaultValue={initial?.name}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Category</Label>
//           <select
//             name="category"
//             required
//             defaultValue={initial?.category ?? ""}
//             className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2 text-sm focus:border-[#be965b] focus:ring-[#be965b]"
//           >
//             <option value="" disabled>
//               Select Product Category
//             </option>
//             {["Beer", "Wine", "Spirits", "Liqueur", "Cocktail", "Soft Drink", "Juice", "Mocktail", "Water"].map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Image, Size & Discount */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Image</Label>
//           <Input
//             type="file"
//             name="image"
//             accept="image/*"
//             className="border-[#cccccc] file:bg-[#be965b] file:text-black file:font-medium"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Size</Label>
//           <Input
//             name="size"
//             defaultValue={initial?.size}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Discount %</Label>
//           <Input
//             name="discount"
//             type="number"
//             defaultValue={initial?.discount ?? 0}
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       {/* Wholesale & Retail */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label className="text-[#1c1c1c]">Wholesale Price(GHS)</Label>
//           <Input
//             name="wholesalePrice"
//             type="number"
//             defaultValue={initial?.wholesalePrice}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//         <div>
//           <Label className="text-[#1c1c1c]">Retail Price(GHS)</Label>
//           <Input
//             name="retailPrice"
//             type="number"
//             defaultValue={initial?.retailPrice}
//             required
//             className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <Label className="text-[#1c1c1c]">Description</Label>
//         <Textarea
//           name="description"
//           defaultValue={initial?.description}
//           className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//         />
//       </div>

//       {/* Action row */}
//       <div className="flex gap-3">
//         <Button
//           type="submit"
//           size="sm"
//           disabled={loading}
//           className="bg-[#be965b] hover:bg-[#a88248] text-black"
//         >
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a] hover:bg-[#f3ede5]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }



