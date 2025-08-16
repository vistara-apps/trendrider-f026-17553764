
"use client";

import { useState, useEffect } from 'react';
import { Memecoin } from '../types';
import { fetchTrendingMemecoins } from '../lib/api';
import { MemecoinListItem } from './MemecoinListItem';

export function TrendDashboard() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadMemecoins = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await fetchTrendingMemecoins();
      setMemecoins(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load memecoins:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadMemecoins();
  }, []);

  const handleMomentumPurchase = (coinId: string, momentum: number) => {
    // In production, this would handle the micro-transaction
    console.log(`Purchased momentum data for ${coinId}: ${momentum}%`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted">Loading trending memecoins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-display text-text">Trending Now</h2>
          {lastUpdated && (
            <p className="text-sm text-muted">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <button
          onClick={() => loadMemecoins(true)}
          disabled={isRefreshing}
          className="btn-secondary disabled:opacity-50"
        >
          {isRefreshing ? '🔄' : '🔄'} Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {memecoins.map((memecoin, index) => (
          <div key={memecoin.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <MemecoinListItem
              memecoin={memecoin}
              variant="withMomentum"
              onMomentumPurchase={handleMomentumPurchase}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-8 p-4 bg-surface/50 rounded-lg border border-white/10">
        <p className="text-sm text-muted mb-2">
          💡 Tip: Tap the star to add coins to your watchlist
        </p>
        <p className="text-xs text-muted">
          Momentum indicators cost $0.10 and show trend acceleration
        </p>
      </div>
    </div>
  );
}
