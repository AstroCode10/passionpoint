import * as React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-400 ${className}`}
    {...props}
  />
));

Input.displayName = "Input";
