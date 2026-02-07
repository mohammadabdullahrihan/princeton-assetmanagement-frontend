import React from 'react';

export const Card = ({ children, className = '', hover = false, ...props }) => {
    const baseClass = hover ? 'card-hover' : 'card'; // Defined in index.css

    return (
        <div className={`${baseClass} ${className}`} {...props}>
            {children}
        </div>
    );
};
