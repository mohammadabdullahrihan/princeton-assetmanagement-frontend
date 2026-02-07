import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

// --- Label ---
export const Label = ({ children, htmlFor, className = "", required = false }) => (
    <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-900 dark:text-white mb-2 ${className}`}
    >
        {children}
        {required && <span className="text-error-500 ml-1">*</span>}
    </label>
);

// --- InputHelperText ---
export const InputHelperText = ({ children, error = false, success = false }) => {
    if (!children) return null;

    let colorClass = "text-gray-500";
    if (error) colorClass = "text-error-500";
    else if (success) colorClass = "text-success-500";

    return <p className={`mt-1.5 text-xs ${colorClass}`}>{children}</p>;
};

// --- Input ---
export const Input = forwardRef(({
    id,
    label,
    type = "text",
    placeholder,
    error,
    success,
    hint,
    className = "",
    disabled,
    required,
    ...props
}, ref) => {
    let borderClass = "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800";

    if (error) borderClass = "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800";
    else if (success) borderClass = "border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500 dark:focus:border-success-800";

    if (disabled) borderClass = "border-gray-300 bg-gray-100 opacity-40 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700";
    else borderClass += " bg-white dark:bg-gray-900";

    return (
        <div className="w-full">
            {label && <Label htmlFor={id} required={required}>{label}</Label>}
            <div className="relative">
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:text-white/90 dark:placeholder:text-white/30 ${borderClass} ${className}`}
                    {...props}
                />
            </div>
            <InputHelperText error={error} success={success}>{hint}</InputHelperText>
        </div>
    );
});
Input.displayName = "Input";

// --- Select ---
export const Select = forwardRef(({
    id,
    label,
    options = [],
    placeholder = "Select an option",
    error,
    success,
    hint,
    className = "",
    disabled,
    required,
    ...props
}, ref) => {
    let borderClass = "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800";

    if (error) borderClass = "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800";

    return (
        <div className="w-full">
            {label && <Label htmlFor={id} required={required}>{label}</Label>}
            <div className="relative">
                <select
                    ref={ref}
                    id={id}
                    disabled={disabled}
                    className={`h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${borderClass} ${className}`}
                    {...props}
                >
                    <option value="" disabled className="text-gray-500">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="text-gray-900 dark:text-white dark:bg-gray-900">
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
            </div>
            <InputHelperText error={error} success={success}>{hint}</InputHelperText>
        </div>
    );
});
Select.displayName = "Select";

// --- Checkbox ---
export const Checkbox = forwardRef(({
    id,
    label,
    error,
    className = "",
    disabled,
    ...props
}, ref) => {
    return (
        <div className={`flex items-start ${className}`}>
            <div className="flex items-center h-5">
                <input
                    ref={ref}
                    id={id}
                    type="checkbox"
                    disabled={disabled}
                    className={`w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-brand-500/50 text-brand-500 ${error ? 'border-error-500' : ''}`}
                    {...props}
                />
            </div>
            {label && (
                <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            )}
        </div>
    );
});
Checkbox.displayName = "Checkbox";
