import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
}
Card.displayName = "Card"

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}
CardHeader.displayName = "CardHeader"

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}
CardTitle.displayName = "CardTitle"

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
CardDescription.displayName = "CardDescription"

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}
CardContent.displayName = "CardContent"

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
