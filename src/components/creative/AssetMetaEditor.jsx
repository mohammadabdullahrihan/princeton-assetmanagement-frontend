import React from 'react';
import { assetTypes } from '../../config/assetTypes';

const AssetMetaEditor = ({ category, values, onChange }) => {
    const schema = assetTypes[category]?.metadataSchema || [];

    if (schema.length === 0) {
        return <p className="text-xs text-muted-foreground italic">No custom metadata for this category.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.map((field) => (
                <div key={field.name} className="space-y-1.5">
                    <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        {field.label}
                    </label>
                    {field.type === 'checkbox' ? (
                        <div className="flex items-center gap-3 h-11 px-4 bg-muted/20 border border-border/50 rounded-xl">
                            <input
                                type="checkbox"
                                checked={!!values[field.name]}
                                onChange={(e) => onChange(field.name, e.target.checked)}
                                className="w-4 h-4 rounded border-border text-gold-500 focus:ring-gold-500 bg-gray-900"
                            />
                            <span className="text-xs font-semibold text-foreground">Enable {field.label}</span>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            value={values[field.name] || ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            className="input text-xs"
                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default AssetMetaEditor;
