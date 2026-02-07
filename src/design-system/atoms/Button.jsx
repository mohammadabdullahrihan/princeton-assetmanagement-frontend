import React from 'react';

const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'badge-success', // Reusing badge color logic for consistency or define btn-success in global css
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
};

export const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseClass = 'btn'; // Defined in index.css
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
