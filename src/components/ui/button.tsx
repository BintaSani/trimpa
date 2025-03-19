import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[#7c8db0] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#7c8db0] shadow-xs hover:bg-primary/90 ",
        destructive:
          "bg-white text-[#7c8db0] shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[1px] border-[#CBD4E6] bg-white shadow-xs hover:bg-accent hover:text-[#7c8db0] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-white text-[#7c8db0] shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-[#7c8db0] dark:hover:bg-accent/50",
        link: "text-[#7c8db0] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-4 p-3 has-[>svg]:px-3",
        sm: "h-12 gap-1.5 p-3 has-[>svg]:px-2.5",
        lg: "h-12 p-3 has-[>svg]:px-4",
        icon: "size-9",
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
