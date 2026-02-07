import React, { useState } from 'react';

/**
 * UniversalForm Component
 * Reusable form component with dynamic fields
 */

const UniversalForm = ({
    fields,
    onSubmit,
    initialData = {},
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    onCancel,
    isLoading = false,
}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }

            if (field.type === 'number' && formData[field.name]) {
                const value = Number(formData[field.name]);
                if (field.min !== undefined && value < field.min) {
                    newErrors[field.name] = `${field.label} must be at least ${field.min}`;
                }
                if (field.max !== undefined && value > field.max) {
                    newErrors[field.name] = `${field.label} must be at most ${field.max}`;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const renderField = (field) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            value: formData[field.name] || '',
            onChange: (e) => handleChange(field.name, e.target.value),
            className: `input ${errors[field.name] ? 'input-error' : ''}`,
            placeholder: field.placeholder,
        };

        switch (field.type) {
            case 'textarea':
                return <textarea {...commonProps} rows={4} />;

            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                        className="h-4 w-4 text-gold-500 focus:ring-gold-500 bg-gray-900 border-gray-700 rounded"
                    />
                );

            case 'number':
                return (
                    <input
                        {...commonProps}
                        type="number"
                        min={field.min}
                        max={field.max}
                        step="any"
                    />
                );

            case 'date':
                return <input {...commonProps} type="date" />;

            default:
                return <input {...commonProps} type="text" />;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="label text-muted-foreground mb-2 block">
                        {field.label}
                        {field.required && <span className="text-rose-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                    {errors[field.name] && (
                        <p className="mt-1 text-sm text-rose-500">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                >
                    {isLoading ? 'Submitting...' : submitLabel}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="btn btn-secondary flex-1"
                    >
                        {cancelLabel}
                    </button>
                )}
            </div>
        </form>
    );
};

export default UniversalForm;
