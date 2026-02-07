import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className = "",
    size = "md", // sm, md, lg, xl, full
    showCloseButton = true
}) => {
    const modalRef = useRef(null);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Size classes
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "w-full h-full rounded-none",
    };

    const maxWidthClass = sizeClasses[size] || sizeClasses.md;
    const roundedClass = size === "full" ? "" : "rounded-xl";

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm transition-all duration-300">
            <div
                ref={modalRef}
                className={`relative flex flex-col bg-white shadow-xl transition-all dark:bg-gray-900 w-full ${maxWidthClass} ${roundedClass} ${className}`}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/[0.05]">
                        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50 rounded-b-xl flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;
