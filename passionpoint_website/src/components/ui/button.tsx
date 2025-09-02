import * as React from "react"
import clsx from "clsx"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 text-black hover:bg-neutral-100",
    ghost: "text-black hover:bg-neutral-100"
  }

  const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  )
}

