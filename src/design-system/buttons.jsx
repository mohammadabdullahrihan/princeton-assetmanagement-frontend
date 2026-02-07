export const buttonStyles = {
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
