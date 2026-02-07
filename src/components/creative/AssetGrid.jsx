import React from 'react';
import AssetCard from './AssetCard';
import { useLazyLoadAssets } from '../../hooks/useLazyLoadAssets';

const AssetGrid = ({ assets, onAssetClick, isLoading }) => {
    const { visibleAssets, lastElementRef, hasMore } = useLazyLoadAssets(assets, 20);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="card aspect-[3/4] bg-muted/20 border-border/50 rounded-2xl" />
                ))}
            </div>
        );
    }

    if (!assets || assets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6 border border-border/10">
                    <span className="text-4xl text-muted-foreground opacity-20">📂</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">No Assets Found</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">
                    Try adjusting your filters or upload a new creative asset to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleAssets.map((asset, index) => {
                    const isLast = visibleAssets.length === index + 1;
                    return (
                        <div key={asset._id} ref={isLast ? lastElementRef : null}>
                            <AssetCard
                                asset={asset}
                                onClick={onAssetClick}
                            />
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center py-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-75" />
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-150" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-2">Loading more resources...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetGrid;
