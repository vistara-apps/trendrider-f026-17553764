
"use client";

import { User } from '../types';

const STORAGE_KEY = 'trendridder_user';

export function getUserData(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveUserData(user: User): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function addToWatchlist(coinId: string, fid: string = 'guest'): void {
  const userData = getUserData() || { fid, watchlist: [] };
  
  if (!userData.watchlist.includes(coinId)) {
    userData.watchlist.push(coinId);
    saveUserData(userData);
  }
}

export function removeFromWatchlist(coinId: string, fid: string = 'guest'): void {
  const userData = getUserData() || { fid, watchlist: [] };
  
  userData.watchlist = userData.watchlist.filter(id => id !== coinId);
  saveUserData(userData);
}

export function isInWatchlist(coinId: string): boolean {
  const userData = getUserData();
  return userData?.watchlist.includes(coinId) || false;
}
