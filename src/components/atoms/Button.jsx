import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-discord-blurple to-discord-dark text-white hover:scale-105 hover:brightness-110 shadow-lg focus:ring-discord-blurple",
    secondary: "bg-discord-surface hover:bg-discord-tertiary text-white border border-discord-tertiary hover:scale-105 focus:ring-discord-surface",
    outline: "border-2 border-discord-blurple text-discord-blurple hover:bg-discord-blurple hover:text-white hover:scale-105 focus:ring-discord-blurple",
    ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-discord-tertiary hover:scale-105 focus:ring-gray-400",
    danger: "bg-gradient-to-r from-discord-red to-red-600 text-white hover:scale-105 hover:brightness-110 shadow-lg focus:ring-discord-red"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          className="animate-spin"
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;