"use client";

import { deleteCustomer } from "../actions"; // Import your customer server action
import { useServerAction } from "@/lib/use-server-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function CustomerActions({ customer }: { customer: any }) {
  const [open, setOpen] = useState(false);

  const wrappedDelete = useServerAction(deleteCustomer);
  const handleDelete = async () => {
    const res = await wrappedDelete(customer.id);
    if (res?.ok) setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="border-[#be965b] text-[#be965b] hover:bg-[#be965b]/10"
        asChild
      >
        <Link href={`/cms/customers/${customer.id}`}>Edit</Link>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="border-[#7b2e2e] text-[#7b2e2e] hover:bg-[#7b2e2e]/10"
          >
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{customer.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}






// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// export function CustomerActions({ customer }: { customer: any }) {
//   const router = useRouter();

//   const handleEdit = () => {
//     router.push(`/cms/customers/${customer.id}`);
//   };

//   // Add delete confirmation if desired
//   const handleDelete = () => {
//     if (confirm(`Delete customer ${customer.name}?`)) {
//       // Implement delete logic via server action or API call
//     }
//   };

//   return (
//     <div className="space-x-2">
//       <Button size="sm" onClick={handleEdit}>
//         Edit
//       </Button>
//       <Button size="sm" variant="destructive" onClick={handleDelete}>
//         Delete
//       </Button>
//     </div>
//   );
// }
