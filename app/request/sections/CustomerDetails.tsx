"use client";

import { useState } from "react";

interface CustomerDetailsProps {
  customer: any;
  setCustomer: (val: any) => void;
}

export default function CustomerDetails({ customer, setCustomer }: CustomerDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-[#be965b] mb-4">Customer Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name (optional)</label>
          <input
            type="text"
            value={customer.businessName}
            onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
          />
        </div>

        {/* NEW: Business Type dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Type</label>
          <select
            value={customer.businessType}
            onChange={(e) => setCustomer({ ...customer, businessType: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
          >
            <option value="">Select Business Type</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>
    </div>
  );
}




// "use client";

// import { useState } from "react";

// interface CustomerDetailsProps {
//   customer: any;
//   setCustomer: (val: any) => void;
// }

// export default function CustomerDetails({ customer, setCustomer }: CustomerDetailsProps) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//       <h3 className="text-xl font-semibold text-[#be965b] mb-4">Customer Details</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Customer Name</label>
//           <input
//             type="text"
//             value={customer.name}
//             onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Business Name (optional)</label>
//           <input
//             type="text"
//             value={customer.businessName}
//             onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })}
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={customer.email}
//             onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Phone</label>
//           <input
//             type="text"
//             value={customer.phone}
//             onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
//           />
//         </div>

//         {/* NEW: Business Type dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Business Type</label>
//           <select
//             value={customer.businessType}
//             onChange={(e) => setCustomer({ ...customer, businessType: e.target.value })}
//             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#be965b] focus:border-[#be965b]"
//           >
//             <option value="">Select Business Type</option>
//             <option value="Wholesale">Wholesale</option>
//             <option value="Retail">Retail</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
