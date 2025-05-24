
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: 
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        warning:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        info:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        active:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        glass:
          "backdrop-blur-md bg-white/20 border-white/30 shadow-sm",
        free:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        paid:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        cancel:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        urgent:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200 animate-pulse",
        ontime:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        delayed:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        boarding:
          "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200 animate-pulse",
        departed:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        landing:
          "border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200",
        reminder:
          "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
        attention:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200 animate-pulse",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-2.5 py-0.5 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
