import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";

export const DropdownMenu = DropdownPrimitive.Root;

export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownPrimitive.Content
      ref={ref}
      className={`rounded-md border bg-white p-2 shadow-md ${className}`}
      {...props}
    />
  )
);

export const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${className}`}
    {...props}
  />
));
