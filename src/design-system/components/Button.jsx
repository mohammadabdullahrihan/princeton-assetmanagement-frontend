import React, { forwardRef } from "react";
import { buttonStyles } from "../buttons"; // Reusing the style file if it exists, or defining here.

// Integrating styles directly here for portability as requested to have a standalone component structure
const styles = {
    base: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    variants: {
        primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
        danger: "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
    },
    sizes: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
    }
};

const Button = forwardRef(({
    children,
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
    className = "",
    disabled = false,
    type = "button",
    ...props
}, ref) => {
    const variantClass = styles.variants[variant] || styles.variants.primary;
    const sizeClass = styles.sizes[size] || styles.sizes.md;

    return (
        <button
            ref={ref}
            type={type}
            className={`${styles.base} ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled}
            {...props}
        >
            {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
