import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isLoading = false,
    variant = 'danger' // danger, warning, success
}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const variants = {
        danger: {
            icon: ShieldAlert,
            color: 'text-red-600',
            bg: 'bg-red-600/10',
            border: 'border-red-600/20',
            button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20',
            glow: 'after:bg-red-600/20'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-gold-500',
            bg: 'bg-gold-500/10',
            border: 'border-gold-500/20',
            button: 'bg-gold-500 hover:bg-gold-600 text-black shadow-gold-500/20',
            glow: 'after:bg-gold-500/20'
        },
        success: {
            icon: CheckCircle2,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            button: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20',
            glow: 'after:bg-emerald-500/20'
        }
    };

    const currentVariant = variants[variant];
    const Icon = currentVariant.icon;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#09090b] border border-white/10 rounded-3xl p-6 shadow-2xl animate-scale-in-soft overflow-hidden group">

                {/* Decorative Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${currentVariant.color}`} />
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none ${currentVariant.bg.replace('/10', '')}`} />

                <div className="relative z-10">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon Wrapper */}
                        <div className={`p-4 rounded-2xl ${currentVariant.bg} ${currentVariant.border} border mb-2 group-hover:scale-110 transition-transform duration-500`}>
                            <Icon className={`w-8 h-8 ${currentVariant.color}`} />
                        </div>

                        {/* Text Content */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white tracking-tight">
                                {title}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                {message}
                            </p>
                            {description && (
                                <div className="mt-2 p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-muted-foreground text-left w-full break-all font-mono">
                                    {description}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 w-full pt-4">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all border border-white/5 hover:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${currentVariant.button}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    confirmLabel
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;
