
"use client";

import { useState } from 'react';
import { Memecoin } from '../types';
import { fetchMemecoinMomentum } from '../lib/api';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../lib/storage';

interface MemecoinListItemProps {
  memecoin: Memecoin;
  variant?: 'default' | 'withMomentum';
  onMomentumPurchase?: (coinId: string, momentum: number) => void;
}

export function MemecoinListItem({ 
  memecoin, 
  variant = 'default',
  onMomentumPurchase 
}: MemecoinListItemProps) {
  const [isLoadingMomentum, setIsLoadingMomentum] = useState(false);
  const [momentum, setMomentum] = useState<number | null>(memecoin.trendMomentum || null);
  const [isWatchlisted, setIsWatchlisted] = useState(isInWatchlist(memecoin.id));

  const handleViewMomentum = async () => {
    if (momentum !== null) return;
    
    setIsLoadingMomentum(true);
    try {
      const momentumData = await fetchMemecoinMomentum(memecoin.id);
      setMomentum(momentumData);
      onMomentumPurchase?.(memecoin.id, momentumData);
    } catch (error) {
      console.error('Failed to fetch momentum:', error);
    } finally {
      setIsLoadingMomentum(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      removeFromWatchlist(memecoin.id);
      setIsWatchlisted(false);
    } else {
      addToWatchlist(memecoin.id);
      setIsWatchlisted(true);
    }
  };

  const getTrendColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getMomentumIndicator = (momentum: number) => {
    if (momentum > 10) return { icon: '📈', color: 'text-green-400', text: `+${momentum.toFixed(1)}%` };
    if (momentum > 0) return { icon: '↗️', color: 'text-green-300', text: `+${momentum.toFixed(1)}%` };
    if (momentum > -10) return { icon: '↘️', color: 'text-red-300', text: `${momentum.toFixed(1)}%` };
    return { icon: '📉', color: 'text-red-400', text: `${momentum.toFixed(1)}%` };
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-text">{memecoin.name}</h3>
            <span className="text-sm text-muted bg-surface px-2 py-1 rounded">
              {memecoin.ticker}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted">Trends:</span>
              <span className={`font-semibold ${getTrendColor(memecoin.googleTrendsScore)}`}>
                {memecoin.googleTrendsScore}/100
              </span>
            </div>
            
            {memecoin.price && (
              <div className="flex items-center gap-2">
                <span className="text-muted">Price:</span>
                <span className="text-text">${memecoin.price.toFixed(6)}</span>
                {memecoin.priceChange24h && (
                  <span className={memecoin.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {memecoin.priceChange24h >= 0 ? '+' : ''}{memecoin.priceChange24h.toFixed(1)}%
                  </span>
                )}
              </div>
            )}
          </div>

          {momentum !== null && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-muted text-sm">Momentum:</span>
              {(() => {
                const indicator = getMomentumIndicator(momentum);
                return (
                  <div className="flex items-center gap-1">
                    <span>{indicator.icon}</span>
                    <span className={`text-sm font-semibold ${indicator.color}`}>
                      {indicator.text}
                    </span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={handleWatchlistToggle}
            className={`btn-icon ${isWatchlisted ? 'text-yellow-400' : 'text-muted'}`}
            title={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {isWatchlisted ? '⭐' : '☆'}
          </button>
          
          {variant === 'withMomentum' && momentum === null && (
            <button
              onClick={handleViewMomentum}
              disabled={isLoadingMomentum}
              className="btn-primary text-xs px-2 py-1 disabled:opacity-50"
            >
              {isLoadingMomentum ? '...' : 'Momentum $0.10'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
