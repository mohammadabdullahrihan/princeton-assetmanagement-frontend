import React from 'react';
import AssetCard from './AssetCard';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const AssetGrid = ({ assets, onAssetClick, isLoading, hasMore, onLoadMore, isFetchingMore }) => {
    const { lastElementRef } = useInfiniteScroll(hasMore, isLoading || isFetchingMore, onLoadMore);

    if (isLoading && (!assets || assets.length === 0)) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-[320px] bg-white/5 border border-white/5 rounded-[2rem] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 h-4 bg-white/10 rounded w-3/4 mb-2" />
                        <div className="absolute bottom-6 left-6 right-6 h-3 bg-white/5 rounded w-1/2" />
                    </div>
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
                {assets.map((asset, index) => {
                    const isLast = assets.length === index + 1;
                    return (
                        <div
                            key={asset._id}
                            ref={isLast ? lastElementRef : null}
                            className="animate-slide-up-subtle opacity-0"
                            style={{ animationDelay: `${(index % 8) * 100}ms` }}
                        >
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
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-2">
                            {isFetchingMore ? 'Fetching more resources...' : 'Scroll to load more'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetGrid;
