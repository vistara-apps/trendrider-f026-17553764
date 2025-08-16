
"use client";

import { useState, useEffect } from 'react';
import { Memecoin } from '../types';
import { fetchTrendingMemecoins } from '../lib/api';
import { getUserData } from '../lib/storage';
import { MemecoinListItem } from './MemecoinListItem';

export function Watchlist() {
  const [watchlistedCoins, setWatchlistedCoins] = useState<Memecoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const userData = getUserData();
        if (!userData || userData.watchlist.length === 0) {
          setWatchlistedCoins([]);
          setIsLoading(false);
          return;
        }

        const allCoins = await fetchTrendingMemecoins();
        const watchlisted = allCoins.filter(coin => userData.watchlist.includes(coin.id));
        setWatchlistedCoins(watchlisted);
      } catch (error) {
        console.error('Failed to load watchlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWatchlist();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted">Loading your watchlist...</p>
      </div>
    );
  }

  if (watchlistedCoins.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">👀</div>
        <h3 className="text-lg font-semibold text-text mb-2">Your Watchlist is Empty</h3>
        <p className="text-muted mb-4">
          Add memecoins to your watchlist by tapping the star icon
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-display text-text">My Watchlist</h2>
        <p className="text-sm text-muted">
          {watchlistedCoins.length} coin{watchlistedCoins.length !== 1 ? 's' : ''} tracked
        </p>
      </div>

      <div className="grid gap-4">
        {watchlistedCoins.map((memecoin, index) => (
          <div key={memecoin.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <MemecoinListItem
              memecoin={memecoin}
              variant="withMomentum"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
