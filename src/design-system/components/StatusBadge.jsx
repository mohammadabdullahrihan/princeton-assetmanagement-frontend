import React from "react";

const StatusBadge = ({
    status, // success, error, warning, info, or custom string
    children,
    className = ""
}) => {
    const styles = {
        success: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500",
        error: "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500",
        warning: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500",
        info: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-500",
        gray: "bg-gray-50 text-gray-700 dark:bg-gray-500/15 dark:text-gray-500",
    };

    const statusKey = status?.toLowerCase();
    const classes = styles[statusKey] || styles.gray;

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${classes} ${className}`}>
            {children}
        </span>
    );
};

export default StatusBadge;
