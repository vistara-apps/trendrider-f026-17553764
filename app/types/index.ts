
export interface Memecoin {
  id: string;
  name: string;
  ticker: string;
  googleTrendsScore: number;
  trendMomentum?: number;
  lastUpdated: string;
  price?: number;
  priceChange24h?: number;
}

export interface User {
  fid: string;
  watchlist: string[];
}

export interface TrendData {
  keyword: string;
  value: number;
  formattedValue: string;
  timeRange: string;
}
