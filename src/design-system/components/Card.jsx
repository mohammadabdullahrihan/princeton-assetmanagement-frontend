import React from "react";

export const Card = ({ children, className = "", ...props }) => {
    return (
        <div
            className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "", border = true, ...props }) => {
    return (
        <div
            className={`px-6 py-5 ${border ? 'border-b border-gray-200 dark:border-gray-800' : ''} ${className}`}
            {...props}
        >
            <h3 className="font-semibold text-gray-900 dark:text-white">
                {children}
            </h3>
        </div>
    );
};

export const CardBody = ({ children, className = "", ...props }) => {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className = "", border = true, ...props }) => {
    return (
        <div
            className={`px-6 py-5 ${border ? 'border-t border-gray-200 dark:border-gray-800' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Also export as default compound component if preferred pattern
// Card.Header = CardHeader;
// Card.Body = CardBody;
// Card.Footer = CardFooter;
