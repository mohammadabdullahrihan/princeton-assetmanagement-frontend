import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { assetService } from '../services/assetService';
import {
    Plus, Search, Filter, X, Save, Calendar, Tag as TagIcon,
    LayoutDashboard, Palette, Image as ImageIcon, Shirt, Mail, Flag, CreditCard,
    Contact2, PenTool, GlassWater, Receipt, ShoppingBag, Layers, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';
import AssetGrid from '../components/creative/AssetGrid';
import UniversalAssetForm from '../components/creative/UniversalAssetForm';
import { assetTypes } from '../config/assetTypes';

const Assets = () => {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState(category || '');
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });

    useEffect(() => {
        setFilterCategory(category || '');
        // Check for auto-upload action
        if (searchParams.get('action') === 'upload') {
            setShowModal(true);
            setEditingAsset(null);
        }
    }, [category, searchParams]);

    useEffect(() => {
        // Reset and fetch when filters change
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchAssets(1);
    }, [searchTerm, filterCategory]);

    const fetchAssets = async (pageNumber = 1) => {
        if (pageNumber === 1) setIsLoading(true);
        else setIsFetchingMore(true);

        try {
            const filters = {
                search: searchTerm,
                assetCategory: filterCategory,
                page: pageNumber,
                limit: pagination.limit,
                sortOrder: 'asc'
            };
            const response = await assetService.getAssets(filters);

            if (pageNumber === 1) {
                setAssets(response.data);
            } else {
                setAssets(prev => [...prev, ...response.data]);
            }

            setPagination(response.pagination);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (pagination.page < pagination.pages && !isFetchingMore) {
            const nextPage = pagination.page + 1;
            fetchAssets(nextPage);
        }
    };

    const handleSave = async (submitData) => {
        setIsLoading(true);
        try {
            if (editingAsset) {
                await assetService.updateAsset(editingAsset._id, submitData);
                toast.success('Asset updated successfully');
            } else {
                await assetService.createAsset(submitData);
                toast.success('Asset created successfully');
            }
            setShowModal(false);
            setEditingAsset(null);
            fetchAssets();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this asset?')) return;

        setIsLoading(true);
        try {
            await assetService.deleteAsset(id);
            toast.success('Asset deleted successfully');
            setShowModal(false);
            setEditingAsset(null);
            fetchAssets();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {filterCategory ? `${assetTypes[filterCategory]?.label || filterCategory} Gallery` : 'Creative Assets'}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {filterCategory ? `Viewing all ${assetTypes[filterCategory]?.label || filterCategory} designs` : 'Manage designs, posters, and brand assets'}
                    </p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setShowModal(true); }}
                    className="btn btn-primary shadow-lg shadow-gold-500/20 text-black font-bold"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    {filterCategory ? `Upload New ${assetTypes[filterCategory]?.label || filterCategory}` : 'Upload New Asset'}
                </button>
            </div>

            {/* Discovery Tools - Only shown on main Gallery page */}
            {!category && (
                <>
                    {/* Refined Search Bar */}
                    <div className="relative z-10 animate-slide-up-subtle">
                        <div className="relative group max-w-2xl">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gold-500/50 group-focus-within:text-gold-500 transition-all duration-300" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search assets, tags, or projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-card/40 backdrop-blur-md border border-white/5 focus:border-gold-500/30 rounded-2xl py-3 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:bg-gold-500/5 shadow-lg focus:shadow-gold-500/5"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gold-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Premium Category Navigation */}
                    <div className="relative overflow-hidden -mx-4 px-4 py-2 animate-slide-up-subtle delay-100 opacity-0">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 -mb-4 scroll-smooth">
                            <button
                                onClick={() => setFilterCategory('')}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${filterCategory === ''
                                    ? 'bg-gold-500 border-gold-500 text-black font-bold shadow-md shadow-gold-500/20'
                                    : 'bg-card/40 border-white/5 text-muted-foreground hover:border-gold-500/30'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wider font-bold">All Resources</span>
                            </button>
                            {Object.entries(assetTypes).map(([key, config]) => {
                                const iconMap = {
                                    id_card: CreditCard,
                                    poster: Palette,
                                    logo: ImageIcon,
                                    visiting_card: Contact2,
                                    tshirt: Shirt,
                                    envelop: Mail,
                                    banner: Flag,
                                    pen: PenTool,
                                    glass: GlassWater,
                                    receipt: Receipt,
                                    bag: ShoppingBag,
                                    other: Layers
                                };
                                const Icon = iconMap[key] || Layers;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setFilterCategory(key)}
                                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${filterCategory === key
                                            ? 'bg-gold-500 border-gold-500 text-black font-bold shadow-md shadow-gold-500/20'
                                            : 'bg-card/40 border-white/5 text-muted-foreground hover:border-gold-500/30'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs uppercase tracking-wider font-bold">{config.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Status Tool Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center animate-slide-up-subtle delay-200 opacity-0">
                        <div className="flex items-center gap-4">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                Found <span className="text-gold-500">{assets.length}</span> Premium Assets
                            </p>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-1.5 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                                <span className="text-[9px] font-black text-gold-500 uppercase tracking-widest">Live Gallery</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn bg-card/40 border border-white/5 hover:border-gold-500/30 text-white min-w-[50px] h-10 px-4 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Gallery View */}
            <AssetGrid
                assets={assets}
                onAssetClick={handleEdit}
                isLoading={isLoading}
                isFetchingMore={isFetchingMore}
                hasMore={pagination.page < pagination.pages}
                onLoadMore={handleLoadMore}
            />

            {/* Portal Modal for Upload/Edit */}
            {showModal && createPortal(
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
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

                        <div className="flex-1 overflow-y-auto">
                            <UniversalAssetForm
                                asset={editingAsset}
                                onSave={handleSave}
                                onDelete={handleDelete}
                                onCancel={() => setShowModal(false)}
                                isLoading={isLoading}
                                initialCategory={filterCategory || 'poster'}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Assets;
