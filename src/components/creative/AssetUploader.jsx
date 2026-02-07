import React, { useState } from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';

const AssetUploader = ({ onFilesChange, existingFiles = [] }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);
        onFilesChange([...selectedFiles, ...files]);
    };

    const removeFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
        onFilesChange(newFiles);
    };

    return (
        <div className="space-y-4">
            <div className="relative group border-2 border-dashed border-border/50 hover:border-gold-500/50 rounded-2xl p-8 transition-all bg-muted/5">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">Click or Drag Files here</p>
                        <p className="text-xs text-muted-foreground mt-1">AI, PSD, PDF, PNG, JPG (Max 50MB)</p>
                    </div>
                </div>
            </div>

            {(selectedFiles.length > 0 || existingFiles.length > 0) && (
                <div className="grid grid-cols-2 gap-3 uppercase tracking-tighter font-bold text-[10px]">
                    {selectedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-muted/30 border border-border/50 rounded-lg">
                            <div className="flex items-center gap-2 truncate">
                                <File className="w-3.5 h-3.5 text-gold-500" />
                                <span className="truncate">{file.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="p-1 hover:text-rose-500 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    {existingFiles.map((file, idx) => (
                        <div key={`existing-${idx}`} className="flex items-center justify-between p-2.5 bg-gold-500/5 border border-gold-500/20 rounded-lg">
                            <div className="flex items-center gap-2 truncate">
                                <ImageIcon className="w-3.5 h-3.5 text-gold-500" />
                                <span className="truncate">Remote File {idx + 1}</span>
                            </div>
                            <span className="bg-gold-500/20 px-1.5 py-0.5 rounded">UPLOADED</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssetUploader;
