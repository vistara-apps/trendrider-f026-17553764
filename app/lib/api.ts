
import { Memecoin, TrendData } from '../types';

// Mock data for demonstration - in production, these would call real APIs
const MOCK_MEMECOINS: Memecoin[] = [
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    ticker: 'DOGE',
    googleTrendsScore: 95,
    lastUpdated: new Date().toISOString(),
    price: 0.08,
    priceChange24h: 5.2
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    ticker: 'SHIB',
    googleTrendsScore: 87,
    lastUpdated: new Date().toISOString(),
    price: 0.000009,
    priceChange24h: -2.1
  },
  {
    id: 'pepe',
    name: 'Pepe',
    ticker: 'PEPE',
    googleTrendsScore: 78,
    lastUpdated: new Date().toISOString(),
    price: 0.000001,
    priceChange24h: 12.5
  },
  {
    id: 'bonk',
    name: 'Bonk',
    ticker: 'BONK',
    googleTrendsScore: 65,
    lastUpdated: new Date().toISOString(),
    price: 0.000015,
    priceChange24h: -0.8
  },
  {
    id: 'floki',
    name: 'Floki Inu',
    ticker: 'FLOKI',
    googleTrendsScore: 52,
    lastUpdated: new Date().toISOString(),
    price: 0.00017,
    priceChange24h: 3.4
  }
];

export async function fetchTrendingMemecoins(): Promise<Memecoin[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would:
  // 1. Fetch memecoin list from CoinGecko API
  // 2. Query Google Trends for each coin
  // 3. Calculate trend scores
  // 4. Sort by popularity
  
  return MOCK_MEMECOINS.sort((a, b) => b.googleTrendsScore - a.googleTrendsScore);
}

export async function fetchMemecoinMomentum(coinId: string): Promise<number> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, this would:
  // 1. Fetch historical Google Trends data
  // 2. Calculate momentum indicators
  // 3. Use AI analysis for deeper insights
  
  // Mock momentum calculation
  const momentum = Math.random() * 40 - 20; // Random between -20 and +20
  return momentum;
}

export async function searchTrends(keyword: string): Promise<TrendData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock trend data
  const value = Math.floor(Math.random() * 100);
  return {
    keyword,
    value,
    formattedValue: `${value}/100`,
    timeRange: 'Past 7 days'
  };
}
