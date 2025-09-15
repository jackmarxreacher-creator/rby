"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/* ----------  TYPES  ---------- */
type Customer = {
  id: string;
  name: string;
  email: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

export default function CustomerSelectDialog({ open, onClose, onSelect }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<Customer | null>(null);

  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch("/api/customers");
      const data: Customer[] = await res.json();
      setCustomers(data);
    }
    if (open) fetchCustomers();
  }, [open]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      customers.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      )
    );
  }, [search, customers]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <ul className="max-h-60 overflow-y-auto border rounded">
          {filtered.map((c) => (
            <li
              key={c.id}
              className={`p-2 cursor-pointer ${selected?.id === c.id ? "bg-gray-300" : ""}`}
              onClick={() => setSelected(c)}
            >
              {c.name} - {c.email}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4 space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!selected} onClick={() => onSelect(selected!)}>
            Select Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}





// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function CustomerSelectDialog({ open, onClose, onSelect }) {
//   const [customers, setCustomers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     async function fetchCustomers() {
//       const res = await fetch("/api/customers");
//       const data = await res.json();
//       setCustomers(data); // API already returns sentence-case businessType
//     }
//     if (open) fetchCustomers();
//   }, [open]);

//   useEffect(() => {
//     setFiltered(
//       customers.filter(
//         (c) =>
//           c.name.toLowerCase().includes(search.toLowerCase()) ||
//           c.email.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search, customers]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Select Customer</DialogTitle>
//         </DialogHeader>
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         <ul className="max-h-60 overflow-y-auto border rounded">
//           {filtered.map((c) => (
//             <li
//               key={c.id}
//               className={`p-2 cursor-pointer ${
//                 selected?.id === c.id ? "bg-gray-300" : ""
//               }`}
//               onClick={() => setSelected(c)}
//             >
//               {c.name} - {c.email}
//             </li>
//           ))}
//         </ul>
//         <div className="flex justify-end mt-4 space-x-4">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button disabled={!selected} onClick={() => onSelect(selected)}>
//             Select Customer
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

