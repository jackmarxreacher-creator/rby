import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be965b] disabled:opacity-50 disabled:pointer-events-none h-10 px-6 py-2",
  {
    variants: {
      variant: {
        // Old RBY primary style
        default: "bg-[#be965b] text-black hover:bg-[#a88248]",
        
        // Outline gold
        outline: "border border-[#be965b] text-[#be965b] hover:bg-[#be965b]/10",
        
        // Ghost cream hover
        ghost: "bg-transparent hover:bg-[#f3ede5] text-black",

        // New: Bronze variant
        bronze: "bg-[#9b7c4a] text-white hover:bg-[#82663c]",

        // New: Charcoal variant
        charcoal: "bg-[#1c1c1c] text-white hover:bg-[#333333]",

        // New: Emerald variant
        emerald: "bg-[#206b50] text-white hover:bg-[#1a5742]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-3 rounded-md",
        lg: "h-12 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
