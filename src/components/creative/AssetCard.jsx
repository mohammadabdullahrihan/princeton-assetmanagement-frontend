import React from 'react';
import { FileText, Image as ImageIcon, ExternalLink, Calendar, Tag } from 'lucide-react';

const AssetCard = ({ asset, onClick }) => {
    const mainFile = asset.files?.[0];
    const isImage = mainFile?.format?.match(/(JPG|PNG|SVG|WEBP)/i);

    return (
        <div
            onClick={() => onClick(asset)}
            className="card hover:shadow-theme-lg transition-all cursor-pointer group border border-border/50 overflow-hidden"
        >
            {/* Thumbnail Area */}
            <div className="aspect-[4/3] bg-gray-950 relative flex items-center justify-center overflow-hidden border-b border-border/10">
                {isImage ? (
                    <img
                        src={mainFile.url}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <FileText className="w-12 h-12" />
                        <span className="text-xs font-bold uppercase tracking-widest">{mainFile?.format || 'DOC'}</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-gold-500 uppercase tracking-wider border border-gold-500/20">
                    {asset.assetCategory?.replace('_', ' ')}
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-gold-500 transition-colors">
                        {asset.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                        {asset.description || 'No description provided.'}
                    </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium border-t border-border/10 pt-3">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-gold-500" />
                        <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>
                    {asset.festivalDate && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded">
                            <span className="font-bold">FESTIVAL</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssetCard;
