import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="label">{label}</label>}
            <input
                ref={ref}
                className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
