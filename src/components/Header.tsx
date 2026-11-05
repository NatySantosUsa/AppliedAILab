import React from 'react';
import { TrendingDown, Download, FileText, BarChart3, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMemo: () => void;
  onDownloadCSV: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMemo,
  onDownloadCSV,
}) => {
  const tabs = [
    { id: 'summary', label: 'Executive Answer' },
    { id: 'waterfall', label: 'Revenue Bridge' },
    { id: 'drivers', label: 'Root-Cause Drivers' },
    { id: 'simulator', label: 'Turnaround Simulator' },
    { id: 'benchmarks', label: 'All Regions' },
    { id: 'data', label: 'Orders Explorer (548)' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs tracking-wider uppercase text-slate-500">
                Quarterly Sales Diagnostic · 2026
              </span>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                <TrendingDown className="w-3 h-3 text-rose-600" />
                West Region Alert
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              West Region Revenue Analysis &amp; Action Plan
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Jan 1 – Sep 30, 2026 · Lab 1 Regional Sales Data (548 Transactions across 4 Regions)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-slate-900"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              Executive Memo
            </button>

            <button
              onClick={onDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-slate-900"
              title="Download clean CSV of West orders or full dataset"
            >
              <Download className="w-4 h-4 text-slate-600" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-100 pt-2 pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
