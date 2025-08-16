
"use client";

import { type ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-lg mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-display text-center text-primary mb-2">
            TrendRider
          </h1>
          <p className="text-body text-muted text-center">
            Ride the memecoin hype wave
          </p>
        </header>
        
        <main className="space-y-4">
          {children}
        </main>
        
        <footer className="mt-8 pt-4 text-center">
          <p className="text-sm text-muted">
            Powered by Google Trends & CoinGecko
          </p>
        </footer>
      </div>
    </div>
  );
}
