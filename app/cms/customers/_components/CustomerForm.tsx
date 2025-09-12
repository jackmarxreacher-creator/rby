"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Customer {
  name?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: string;
  businessType?: string;
}

interface CustomerFormProps {
  initialCustomer?: Customer | null;
  onSave: (data: FormData) => Promise<void>;
}

export default function CustomerForm({ initialCustomer, onSave }: CustomerFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData);
    setLoading(false);
    router.push("/cms/customers");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#be965b]">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Customer Name <span className="text-red-500">*</span></label>
          <input
            name="name"
            defaultValue={initialCustomer?.name ?? ""}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
          <input
            name="businessName"
            defaultValue={initialCustomer?.businessName ?? ""}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business Type <span className="text-red-500">*</span></label>
          <select
            name="businessType"
            required
            defaultValue={initialCustomer?.businessType ?? ""}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b] text-gray-600"
          >
            <option value="" disabled>Select your business type</option>
            <option value="WHOLESALE">Wholesale</option>
            <option value="RETAIL">Retail</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            defaultValue={initialCustomer?.email ?? ""}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="phone"
            defaultValue={initialCustomer?.phone ?? ""}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business Location</label>
          <input
            name="location"
            defaultValue={initialCustomer?.location ?? ""}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Business Address</label>
        <input
          name="address"
          defaultValue={initialCustomer?.address ?? ""}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
        />
      </div>

      <div className="text-center">
        <Button type="submit" disabled={loading} className="px-10 py-3 text-lg bg-[#be965b] hover:bg-[#a88248] text-black">
          {loading ? "Saving…" : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface Customer {
//   name?: string;
//   businessName?: string;
//   email?: string;
//   phone?: string;
//   location?: string;
//   address?: string;
//   businessType?: string;
// }

// interface CustomerFormProps {
//   initialCustomer?: Customer | null;
//   onSave: (data: FormData) => Promise<void>;
// }

// export default function CustomerForm({ initialCustomer, onSave }: CustomerFormProps) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.currentTarget);
//     await onSave(formData);
//     setLoading(false);
//     router.push("/cms/customers");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-[#be965b]">Customer Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">Customer Name <span className="text-red-500">*</span></label>
//           <input
//             name="name"
//             defaultValue={initialCustomer?.name ?? ""}
//             required
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
//           <input
//             name="businessName"
//             defaultValue={initialCustomer?.businessName ?? ""}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Business Type <span className="text-red-500">*</span></label>
//           <select
//             name="businessType"
//             required
//             defaultValue={initialCustomer?.businessType ?? ""}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b] text-gray-600"
//           >
//             <option value="" disabled>Select your business type</option>
//             <option value="WHOLESALE">Wholesale</option>
//             <option value="RETAIL">Retail</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
//           <input
//             type="email"
//             name="email"
//             defaultValue={initialCustomer?.email ?? ""}
//             required
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
//           <input
//             type="tel"
//             name="phone"
//             defaultValue={initialCustomer?.phone ?? ""}
//             required
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Business Location</label>
//           <input
//             name="location"
//             defaultValue={initialCustomer?.location ?? ""}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Business Address</label>
//         <input
//           name="address"
//           defaultValue={initialCustomer?.address ?? ""}
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//         />
//       </div>

//       <div className="text-center">
//         <Button type="submit" disabled={loading} className="px-10 py-3 text-lg bg-[#be965b] hover:bg-[#a88248] text-black">
//           {loading ? "Saving…" : "Save Customer"}
//         </Button>
//       </div>
//     </form>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";

// interface Customer {
//   name: string;
//   businessName?: string;
//   email: string;
//   phone: string;
//   location?: string;
//   address?: string;
//   businessType: "Wholesale" | "Retail" | "";
// }

// interface CustomerFormProps {
//   initialCustomer?: Customer | null;
//   onSubmit: (data: Customer) => void;
// }

// export default function CustomerForm({ initialCustomer, onSubmit }: CustomerFormProps) {
//   const [name, setName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [address, setAddress] = useState("");
//   const [businessType, setBusinessType] = useState<"Wholesale" | "Retail" | "">("");

//   useEffect(() => {
//     if (initialCustomer) {
//       setName(initialCustomer.name ?? "");
//       setBusinessName(initialCustomer.businessName ?? "");
//       setEmail(initialCustomer.email ?? "");
//       setPhone(initialCustomer.phone ?? "");
//       setLocation(initialCustomer.location ?? "");
//       setAddress(initialCustomer.address ?? "");
//       setBusinessType(initialCustomer.businessType ?? "");
//     }
//   }, [initialCustomer]);

//   const allRequiredFilled = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && businessType !== "";

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!allRequiredFilled) return;
//     onSubmit({ name, businessName, email, phone, location, address, businessType });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-[#be965b]">Customer Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Customer Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
//           <input
//             type="text"
//             value={businessName}
//             onChange={(e) => setBusinessName(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Business Type <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={businessType}
//             onChange={(e) => setBusinessType(e.target.value as "Wholesale" | "Retail" | "")}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b] text-gray-600"
//             required
//           >
//             <option value="" disabled>
//               Select your business type
//             </option>
//             <option value="Wholesale">Wholesale</option>
//             <option value="Retail">Retail</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Phone <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Business Location</label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Business Address</label>
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//         />
//       </div>

//       <div className="text-center">
//         <Button type="submit" disabled={!allRequiredFilled} className="px-10 py-3 text-lg bg-[#be965b] hover:bg-[#a88248] text-black">
//           Save Customer
//         </Button>
//       </div>
//     </form>
//   );
// }
