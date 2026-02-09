import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Calendar, Tag as TagIcon, Trash2, Image as ImageIcon, Download, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import AssetUploader from './AssetUploader';
import AssetMetaEditor from './AssetMetaEditor';
import { assetTypes } from '../../config/assetTypes';

const UniversalAssetForm = ({
    asset = null,
    onSave,
    onCancel,
    onDelete,
    isLoading = false,
    initialCategory = 'poster'
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assetCategory: initialCategory,
        festivalDate: '',
        tags: '',
        metadata: {}
    });
    const [files, setFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(!asset); // If no asset, we are creating, so editing is true

    useEffect(() => {
        if (asset) {
            setFormData({
                title: asset.title || '',
                description: asset.description || '',
                assetCategory: asset.assetCategory || 'poster',
                festivalDate: asset.festivalDate ? asset.festivalDate.split('T')[0] : '',
                tags: asset.tags?.join(',') || '',
                metadata: asset.metadata || {}
            });
        }
    }, [asset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEditing) return;

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('assetCategory', formData.assetCategory);
        submitData.append('festivalDate', formData.festivalDate);
        submitData.append('tags', formData.tags);
        submitData.append('metadata', JSON.stringify(formData.metadata));

        files.forEach(file => {
            submitData.append('files', file);
        });

        onSave(submitData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-6 overflow-hidden">
            {/* Top Section: Primary Preview (Full Width) */}
            {asset && asset.files?.some(f => f.format?.match(/(JPG|PNG|SVG|WEBP|JPEG|GIF|AVIF)/i)) && (
                <div className="space-y-2 animate-fade-in">
                    <label className="label text-[10px] uppercase tracking-[0.2em] text-gold-500 font-black">Current Design Preview</label>
                    <div className="relative aspect-video sm:aspect-auto sm:h-[300px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40 group">
                        {(() => {
                            const BACKEND_URL = 'http://localhost:5000';
                            const imageFile = asset.files.find(f => f.format?.match(/(JPG|PNG|SVG|WEBP|JPEG|GIF|AVIF)/i));
                            const imageUrl = imageFile?.url?.startsWith('http')
                                ? imageFile.url
                                : imageFile?.url ? `${BACKEND_URL}${imageFile.url}` : null;

                            return imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                    <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">Preview Unavailable</span>
                                </div>
                            );
                        })()}
                        {/* Gradient overlays for depth */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side: Basic Info */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Category</label>
                            <select
                                className="input h-10 py-0 disabled:opacity-70 disabled:bg-black/20"
                                value={formData.assetCategory}
                                onChange={(e) => setFormData({ ...formData, assetCategory: e.target.value })}
                                disabled={!isEditing}
                            >
                                {Object.entries(assetTypes).map(([key, config]) => (
                                    <option key={key} value={key}>{config.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Title</label>
                            <input
                                type="text"
                                className="input h-10 disabled:opacity-70 disabled:bg-black/20"
                                placeholder="Asset title..."
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Description (Optional)</label>
                        <textarea
                            className="input min-h-[80px] py-2 text-sm disabled:opacity-70 disabled:bg-black/20"
                            placeholder="Write something about this asset..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                                <input
                                    type="date"
                                    className="input pl-10 h-10 disabled:opacity-70 disabled:bg-black/20"
                                    value={formData.festivalDate}
                                    onChange={(e) => setFormData({ ...formData, festivalDate: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Tags</label>
                            <div className="relative">
                                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                                <input
                                    type="text"
                                    className="input pl-10 h-10 disabled:opacity-70 disabled:bg-black/20"
                                    placeholder="tag1, tag2..."
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Uploader Only */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Upload New Files</label>
                        <AssetUploader
                            onFilesChange={setFiles}
                            existingFiles={asset?.files}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Metadata Section */}
            <div className="pt-4 border-t border-border/10">
                <h3 className="text-[10px] font-bold mb-3 uppercase tracking-[0.2em] text-gold-500">Resource Specifications</h3>
                <AssetMetaEditor
                    category={formData.assetCategory}
                    values={formData.metadata}
                    onChange={(name, value) => setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, [name]: value }
                    })}
                    disabled={!isEditing}
                />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center pb-2 pt-4 border-t border-border/10 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {asset && (
                        <button
                            type="button"
                            onClick={async () => {
                                const toastId = toast.loading('Preparing download...');
                                try {
                                    const imageFile = asset.files?.find(f => f.format?.match(/(JPG|PNG|SVG|WEBP|JPEG|GIF|AVIF)/i));

                                    // Dynamically determine backend URL
                                    const BACKEND_URL = window.location.hostname === 'localhost'
                                        ? 'http://localhost:5000'
                                        : window.location.origin;

                                    const imageUrl = imageFile?.url?.startsWith('http')
                                        ? imageFile.url
                                        : imageFile?.url ? `${BACKEND_URL}${imageFile.url}` : null;

                                    if (!imageUrl) {
                                        toast.error('No file available for download', { id: toastId });
                                        return;
                                    }

                                    const response = await fetch(imageUrl, {
                                        method: 'GET',
                                        mode: 'cors',
                                        credentials: 'omit'
                                    });

                                    if (!response.ok) throw new Error('Network response was not ok');

                                    const blob = await response.blob();
                                    const blobUrl = window.URL.createObjectURL(blob);

                                    const link = document.createElement('a');
                                    link.href = blobUrl;
                                    link.download = `${formData.title.replace(/\s+/g, '_') || 'asset'}_${Date.now()}.${imageFile.format.toLowerCase()}`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(blobUrl);

                                    toast.success('Download started!', { id: toastId });
                                } catch (error) {
                                    console.error('Download error:', error);
                                    toast.error('Direct download failed. Opening in new tab...', { id: toastId });

                                    // Fallback
                                    const imageFile = asset.files?.find(f => f.format?.match(/(JPG|PNG|SVG|WEBP|JPEG|GIF|AVIF)/i));
                                    const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
                                    const imageUrl = imageFile?.url?.startsWith('http')
                                        ? imageFile.url
                                        : imageFile?.url ? `${BACKEND_URL}${imageFile.url}` : null;
                                    if (imageUrl) window.open(imageUrl, '_blank');
                                }
                            }}
                            className="flex-1 sm:flex-none btn bg-[#EFB708] text-black hover:bg-white border border-[#EFB708] py-2.5 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-gold-500/20"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Original
                        </button>
                    )}

                    {asset && onDelete && (
                        <button
                            type="button"
                            onClick={() => onDelete(asset._id)}
                            className="flex items-center text-rose-500 hover:text-rose-400 text-[10px] font-black uppercase tracking-widest transition-colors py-2 group"
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                            Delete Asset
                        </button>
                    )}
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button type="button" onClick={onCancel} className="flex-1 sm:flex-none btn btn-secondary py-2.5 text-[10px] font-black uppercase tracking-widest">Cancel</button>

                    {isEditing ? (
                        <button type="submit" className="flex-1 sm:flex-none btn btn-primary py-2.5 text-[10px] font-black uppercase tracking-widest px-6" disabled={isLoading}>
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? 'Processing...' : (asset ? 'Apply Changes' : 'Upload Asset')}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                            className="flex-1 sm:flex-none btn bg-white text-black hover:bg-gold-500 border border-white py-2.5 text-[10px] font-black uppercase tracking-widest px-8 transition-all"
                        >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Details
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default UniversalAssetForm;
