"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

type Product = {
  id: string;
  name: string;
  size: string;
  image: string | null;
  wholesalePrice: number;
  retailPrice: number;
};

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: Product, quantity: number) => void;
  businessType: "Wholesale" | "Retail";
}

export default function ProductDialog({
  open,
  onClose,
  onAddProduct,
  businessType,
}: ProductDialogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [popoverOpen, setPopoverOpen] = useState(false);

  /* fetch products on mount */
  useEffect(() => {
    fetch("/cms/requests/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const handleAdd = () => {
    if (selectedProduct && quantity > 0) {
      onAddProduct(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Product To Add To Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="w-full justify-between"
              >
                {selectedProduct ? (
                  <span className="flex items-center gap-2">
                    <Image
                      src={selectedProduct.image ?? "/placeholder.png"}
                      alt={selectedProduct.name}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    {selectedProduct.name} (
                    {businessType === "Wholesale"
                      ? `GHS ${selectedProduct.wholesalePrice}`
                      : `GHS ${selectedProduct.retailPrice}`}
                    )
                  </span>
                ) : (
                  "Click to Select Product"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 w-[350px]">
              <Command>
                <CommandInput placeholder="Search product..." />
                <CommandList className="max-h-60 p-3 overflow-y-auto overscroll-contain">
                  {products.length === 0 && (
                    <CommandEmpty>Loading products…</CommandEmpty>
                  )}
                  {products.length > 0 && (
                    <CommandGroup>
                      {products.map((p) => (
                        <CommandItem
                          key={p.id}
                          value={p.name}
                          onSelect={() => {
                            setSelectedProduct(p);
                            setPopoverOpen(false);
                          }}
                          className="flex items-center gap-2 cursor-pointer hover:bg-[#f3ede5]"
                        >
                          <Image
                            src={p.image ?? "/placeholder.png"}
                            alt={p.name}
                            width={32}
                            height={32}
                            className="rounded-sm"
                          />
                          <span className="flex-1">{p.name}</span>
                          <span className="text-sm text-gray-600">
                            {businessType === "Wholesale"
                              ? `GHS ${p.wholesalePrice}`
                              : `GHS ${p.retailPrice}`}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              disabled={!selectedProduct}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
              placeholder="Enter quantity"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAdd}
              disabled={!selectedProduct || quantity <= 0}
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

