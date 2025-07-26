import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({
  className,
  type = "text",
  label,
  error,
  hint,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      
      <input
        type={type}
        className={cn(
          "form-input",
          error && "border-discord-red focus:ring-discord-red",
          className
        )}
        ref={ref}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-discord-red">
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;