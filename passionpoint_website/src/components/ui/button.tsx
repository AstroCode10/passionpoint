import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variantStyles = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 hover:bg-neutral-100",
    ghost: "hover:bg-neutral-100"
  }

  const finalStyles = `${baseStyles} ${variantStyles[variant]} ${className ?? ""}`

  return <button className={finalStyles} {...props} />
}
