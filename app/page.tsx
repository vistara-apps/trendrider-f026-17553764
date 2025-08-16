
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { TrendDashboard } from "./components/TrendDashboard";
import { Watchlist } from "./components/Watchlist";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'trends' | 'watchlist'>('trends');

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    setFrameAdded(Boolean(result));
  }, [addFrame]);

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="btn-primary text-sm px-3 py-1"
        >
          + Save App
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center gap-1 text-sm text-primary">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  };

  return (
    <AppShell>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton()}</div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('trends')}
            className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
              activeTab === 'trends'
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:bg-surface/80'
            }`}
          >
            📈 Trending
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
              activeTab === 'watchlist'
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:bg-surface/80'
            }`}
          >
            ⭐ Watchlist
          </button>
        </div>
      </div>

      {activeTab === 'trends' && <TrendDashboard />}
      {activeTab === 'watchlist' && <Watchlist />}

      <div className="mt-8 text-center">
        <button
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          Built on Base with MiniKit
        </button>
      </div>
    </AppShell>
  );
}
