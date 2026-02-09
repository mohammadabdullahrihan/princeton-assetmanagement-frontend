import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService } from '../services/assetService';
import apiClient from '../services/api';
import { Skeleton } from '../components/ui/Skeleton';
import {
    ArrowLeft,
    Calendar,
    FileText,
    Download,
    Trash2,
    Eye,
    Tag as TagIcon,
    Clock,
    User,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';

import ConfirmationModal from '../components/ui/ConfirmationModal';

const AssetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFile, setActiveFile] = useState(null);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        description: '',
        onConfirm: () => { },
        isLoading: false
    });

    useEffect(() => {
        fetchAssetDetails();
    }, [id]);

    const fetchAssetDetails = async () => {
        try {
            const response = await assetService.getAssetById(id);
            const a = response.data;
            setAsset(a);
            if (a.files && a.files.length > 0) {
                setActiveFile(a.files[0]);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!activeFile) return;
        const link = document.createElement('a');
        link.href = activeFile.url;
        link.download = activeFile.originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const executeDelete = async () => {
        setConfirmModal(prev => ({ ...prev, isLoading: true }));
        try {
            await assetService.deleteAsset(id);
            toast.success('Asset removed successfully');
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
            navigate('/assets');
        } catch (error) {
            toast.error(getErrorMessage(error));
            setConfirmModal(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete this Asset?',
            message: 'This will permanently remove this asset and all its version history. This action cannot be undone.',
            variant: 'danger',
            confirmLabel: 'Delete Permanently',
            isLoading: false,
            onConfirm: executeDelete
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5" />
                        <div className="space-y-2">
                            <div className="w-24 h-4 bg-white/5 rounded" />
                            <div className="w-48 h-8 bg-white/5 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-32 h-10 bg-white/5 rounded-xl" />
                        <div className="w-32 h-10 bg-white/5 rounded-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="aspect-video rounded-3xl bg-white/5 border border-white/5" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-48 rounded-3xl bg-white/5 border border-white/5" />
                            <div className="h-48 rounded-3xl bg-white/5 border border-white/5" />
                        </div>
                    </div>
                    <div className="lg:col-span-4 space-y-6">
                        <div className="h-48 rounded-3xl bg-white/5 border border-white/5" />
                        <div className="h-32 rounded-3xl bg-white/5 border border-white/5" />
                    </div>
                </div>
            </div>
        );
    }

    if (!asset) return <div className="text-center py-20">Asset not found</div>;

    const isImage = (fmt) => fmt?.match(/(JPG|PNG|SVG|WEBP|JPEG)/i);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/assets')} className="p-2.5 bg-muted/20 hover:bg-muted/40 rounded-xl transition-all border border-border/50">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-gold-500/10 text-gold-500 text-[10px] font-bold uppercase tracking-widest rounded border border-gold-500/20">
                                {asset.assetCategory}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground tracking-tighter uppercase opacity-50">#{asset.assetId}</span>
                        </div>
                        <h1 className="text-3xl font-black text-foreground">{asset.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleDelete} className="btn bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500 hover:text-white">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Asset
                    </button>
                    <button onClick={handleDownload} className="btn btn-primary">
                        <Download className="w-4 h-4 mr-2" />
                        Download Original
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Preview Panel */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="card !p-2 bg-black border-border/50 overflow-hidden group">
                        <div className="aspect-video relative bg-muted/5 flex items-center justify-center rounded-2xl overflow-hidden border border-border/10">
                            {isImage(activeFile?.format) ? (
                                <img
                                    src={activeFile?.url}
                                    className="w-full h-full object-contain"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-6 text-muted-foreground opacity-30">
                                    <FileText className="w-32 h-32" />
                                    <p className="text-2xl font-black uppercase tracking-widest">{activeFile?.format || 'Unknown'}</p>
                                </div>
                            )}

                            {/* Zoom/Expand Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <a href={activeFile?.url} target="_blank" className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20">
                                    <ExternalLink className="w-8 h-8 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* File Version Switcher */}
                        <div className="p-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
                            {asset.files?.map((file, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFile(file)}
                                    className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeFile === file
                                        ? 'bg-gold-500/10 border-gold-500 text-gold-500 shadow-lg shadow-gold-500/10'
                                        : 'bg-muted/10 border-border/30 text-muted-foreground hover:border-gold-500/30'
                                        }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase leading-none mb-1">Version {file.version || '1.0'}</p>
                                        <p className="text-[9px] opacity-70 leading-none">{file.format} • {(file.size / 1024 / 1024).toFixed(2)}MB</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-gold-500 rounded-full" />
                                Resource Specification
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(asset.metadata || {}).map(([key, val]) => (
                                    <div key={key} className="flex justify-between items-center py-2 border-b border-border/10">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <span className="text-xs font-bold text-foreground">
                                            {typeof val === 'boolean' ? (val ? 'YES' : 'NO') : val}
                                        </span>
                                    </div>
                                ))}
                                {(!asset.metadata || Object.keys(asset.metadata).length === 0) && (
                                    <p className="text-xs italic text-muted-foreground py-4 text-center">No metadata specifications provided.</p>
                                )}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-gold-500 rounded-full" />
                                Campaign Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-border/10">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Festival Target</span>
                                    <span className="text-xs font-bold text-rose-500 flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        {asset.festivalDate ? new Date(asset.festivalDate).toLocaleDateString() : 'GENERAL PURSPOSE'}
                                    </span>
                                </div>
                                <div className="space-y-2 py-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 block">Target Keywords / Tags</span>
                                    <div className="flex flex-wrap gap-2">
                                        {asset.tags?.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-muted/30 border border-border/30 rounded text-[9px] font-bold uppercase tracking-widest text-foreground/80 hover:bg-gold-500 hover:text-black hover:border-gold-500 cursor-default transition-all">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card border-l-4 border-gold-500">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Brief & Context</h3>
                        <p className="text-sm font-medium leading-relaxed text-foreground/90">
                            {asset.description || 'No description or creative brief provided for this asset.'}
                        </p>
                    </div>



                    {/* Shared Access */}
                    <div className="card bg-muted/5 border-dashed border-border/50">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold-500 mb-4">Quick Link Distribution</h4>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={activeFile?.url || ''}
                                className="flex-1 bg-black/40 border-border/50 text-[9px] font-mono p-2 rounded-lg"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(activeFile?.url || '');
                                    toast.success('Link copied');
                                }}
                                className="px-3 py-2 bg-gold-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400 transition-all font-sans"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                description={confirmModal.description}
                confirmLabel={confirmModal.confirmLabel}
                isLoading={confirmModal.isLoading}
                variant={confirmModal.variant}
            />
        </div>
    );
};

export default AssetDetails;
