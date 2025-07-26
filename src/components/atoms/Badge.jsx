import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-discord-tertiary dark:text-gray-200",
    primary: "bg-discord-blurple/10 text-discord-blurple dark:bg-discord-blurple/20",
    success: "bg-discord-green/10 text-discord-green dark:bg-discord-green/20",
    warning: "bg-discord-yellow/10 text-yellow-800 dark:bg-discord-yellow/20 dark:text-yellow-200",
    danger: "bg-discord-red/10 text-discord-red dark:bg-discord-red/20",
    online: "bg-discord-green text-white shadow-lg",
    offline: "bg-gray-500 text-white shadow-lg"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;