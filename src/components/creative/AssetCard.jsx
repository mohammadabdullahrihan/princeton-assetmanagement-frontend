import React from 'react';
import { FileText, Image as ImageIcon, ExternalLink, Calendar, Tag, Shield } from 'lucide-react';

const AssetCard = ({ asset, onClick }) => {
    // Base URL for local uploads
    const BACKEND_URL = 'http://localhost:5000';

    // Find the first image file to use as cover, fallback to first file
    const imageFile = asset.files?.find(f => f.format?.match(/(JPG|PNG|SVG|WEBP|JPEG|GIF|AVIF)/i));
    const mainFile = imageFile || (asset.files && asset.files.length > 0 ? asset.files[0] : null);
    const isImage = !!imageFile;
    const [imageError, setImageError] = React.useState(false);

    // Properly format the URL
    const imageUrl = mainFile?.url?.startsWith('http')
        ? mainFile.url
        : mainFile?.url ? `${BACKEND_URL}${mainFile.url}` : null;

    // Get label from assetTypes config if available
    const categoryLabel = asset.assetCategory
        ? asset.assetCategory.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Asset';

    return (
        <div
            onClick={() => onClick(asset)}
            className="group relative h-[320px] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(239,183,8,0.3)] bg-gray-900 border border-white/5 hover:border-gold-500/50"
        >
            {/* Background Image Area */}
            <div className="absolute inset-0 z-0 bg-black">
                {isImage && !imageError && imageUrl ? (
                    <div className="w-full h-full p-6 flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt={asset.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                setImageError(true);
                            }}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-muted-foreground opacity-40">
                        {isImage ? <ImageIcon className="w-12 h-12 mb-2" /> : <FileText className="w-12 h-12 mb-2" />}
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{mainFile?.format || 'NO FILE'}</span>
                    </div>
                )}
                {/* Gradient Overlays - Always visible at bottom for text readability, full overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                    {categoryLabel}
                </span>
            </div>

            {/* Hover Action Button - Top Right */}
            {/* Mobile: Always visible. Desktop: Slides in on hover. */}
            <div className="absolute top-4 right-4 z-10 translate-x-0 opacity-100 md:translate-x-12 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:delay-100">
                <button
                    onClick={() => onClick(asset)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gold-500 transition-colors transform hover:rotate-45 duration-300"
                >
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>

            {/* Content Area - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="space-y-1">
                    {/* Title & Description */}
                    <div>
                        <h3 className="font-black text-xl text-white leading-tight mb-2 group-hover:text-gold-500 transition-colors drop-shadow-md">
                            {asset.title}
                        </h3>
                        {/* Mobile: Always visible. Desktop: Reveals on hover. */}
                        <div className="h-auto md:h-0 md:group-hover:h-auto overflow-hidden transition-all duration-500">
                            <p className="text-xs text-gray-300 line-clamp-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100 leading-relaxed mb-4">
                                {asset.description || 'Premium asset ready for deployment.'}
                            </p>
                        </div>
                    </div>

                    {/* Footer Details */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-gold-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                            <Calendar className="w-3 h-3 text-gold-500" />
                            <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                        </div>
                        {/* Mobile: Always visible. Desktop: Fades in on hover. */}
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-200">
                            <span className="text-[10px] font-bold text-gold-500 uppercase tracking-wider">View Details</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AssetCard;
