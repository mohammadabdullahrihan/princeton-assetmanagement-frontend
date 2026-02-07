import React, { useState, useEffect } from 'react';
import { assetService } from '../services/assetService';
import { Plus, Search, Filter, X, Save, Calendar, Tag as TagIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';
import AssetGrid from '../components/creative/AssetGrid';
import AssetUploader from '../components/creative/AssetUploader';
import AssetMetaEditor from '../components/creative/AssetMetaEditor';
import { assetTypes } from '../config/assetTypes';

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 100, total: 0, pages: 0 });

    // New Asset State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assetCategory: 'poster',
        festivalDate: '',
        tags: '',
        metadata: {}
    });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchAssets();
    }, [searchTerm, filterCategory]);

    const fetchAssets = async () => {
        try {
            const filters = {
                search: searchTerm,
                assetCategory: filterCategory,
            };
            const response = await assetService.getAssets(filters);
            setAssets(response.data);
            setPagination(response.pagination);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
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

            if (editingAsset) {
                await assetService.updateAsset(editingAsset._id, submitData);
                toast.success('Asset updated successfully');
            } else {
                await assetService.createAsset(submitData);
                toast.success('Asset created successfully');
            }

            setShowModal(false);
            resetForm();
            fetchAssets();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            assetCategory: 'poster',
            festivalDate: '',
            tags: '',
            metadata: {}
        });
        setFiles([]);
        setEditingAsset(null);
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setFormData({
            title: asset.title,
            description: asset.description,
            assetCategory: asset.assetCategory,
            festivalDate: asset.festivalDate ? asset.festivalDate.split('T')[0] : '',
            tags: asset.tags.join(','),
            metadata: asset.metadata || {}
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Creative Assets</h1>
                    <p className="text-muted-foreground mt-1">Manage designs, posters, and brand assets</p>
                </div>
                <button onClick={() => { resetForm(); setShowModal(true); }} className="btn btn-primary">
                    <Plus className="w-5 h-5 mr-2" />
                    Upload Asset
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by title, tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="input"
                    >
                        <option value="">All Categories</option>
                        {Object.entries(assetTypes).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                        ))}
                    </select>
                    <button className="btn btn-secondary">
                        <Filter className="w-5 h-5 mr-2" />
                        Refine Gallery
                    </button>
                </div>
            </div>

            {/* Gallery View */}
            <AssetGrid
                assets={assets}
                onAssetClick={handleEdit}
                isLoading={isLoading}
            />

            {/* Single Modal for Upload/Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-card border border-border/50 rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-border/10 flex justify-between items-center bg-muted/5">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <div className="p-2 bg-gold-500/10 rounded-lg">
                                    <Plus className="w-5 h-5 text-gold-500" />
                                </div>
                                {editingAsset ? 'Modify Asset Details' : 'Upload New Design'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-8 space-y-8 overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Side: Basic Info */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Category</label>
                                        <select
                                            className="input"
                                            value={formData.assetCategory}
                                            onChange={(e) => setFormData({ ...formData, assetCategory: e.target.value })}
                                        >
                                            {Object.entries(assetTypes).map(([key, config]) => (
                                                <option key={key} value={key}>{config.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Title</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Asset title..."
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Description</label>
                                        <textarea
                                            className="input min-h-[100px] py-3"
                                            placeholder="Write something about this asset..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Uploader + Config Fields */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Asset Files</label>
                                        <AssetUploader
                                            onFilesChange={setFiles}
                                            existingFiles={editingAsset?.files}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Festival Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                                                <input
                                                    type="date"
                                                    className="input pl-10"
                                                    value={formData.festivalDate}
                                                    onChange={(e) => setFormData({ ...formData, festivalDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="label text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Tags</label>
                                            <div className="relative">
                                                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                                                <input
                                                    type="text"
                                                    className="input pl-10"
                                                    placeholder="tag1, tag2..."
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Metadata Section */}
                            <div className="pt-6 border-t border-border/10">
                                <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-gold-500">Resource Specifications</h3>
                                <AssetMetaEditor
                                    category={formData.assetCategory}
                                    values={formData.metadata}
                                    onChange={(name, value) => setFormData({
                                        ...formData,
                                        metadata: { ...formData.metadata, [name]: value }
                                    })}
                                />
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    <Save className="w-5 h-5 mr-2" />
                                    {isLoading ? 'Processing...' : (editingAsset ? 'Apply Changes' : 'Upload Asset')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assets;
