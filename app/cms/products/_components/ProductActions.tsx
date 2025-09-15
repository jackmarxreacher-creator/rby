"use client";

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
import { deleteProduct } from "../actions";

interface Props {
  product: {
    id: string;
    name: string;
  };
}

export function ProductActions({ product }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(product.id);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="border-[#be965b] text-[#be965b] hover:bg-[#be965b]/10"
        asChild
      >
        <Link href={`/cms/products/${product.id}`}>Edit</Link>
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
              Are you sure you want to delete <strong>{product.name}</strong>?
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

