import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { WaterfallBridge } from './components/WaterfallBridge';
import { DeepDiveDrivers } from './components/DeepDiveDrivers';
import { TurnaroundSimulator } from './components/TurnaroundSimulator';
import { RegionalBenchmarking } from './components/RegionalBenchmarking';
import { OrdersExplorer } from './components/OrdersExplorer';
import { ExecutiveMemoModal } from './components/ExecutiveMemoModal';
import { ALL_ORDERS } from './data/salesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);

  const handleDownloadFullCSV = () => {
    const headers = [
      'order_id',
      'order_date',
      'quarter',
      'region',
      'channel',
      'product',
      'customer_type',
      'sales_rep',
      'units',
      'unit_price',
      'discount_pct',
      'revenue',
    ];
    const rows = ALL_ORDERS.map((o) => [
      o.order_id,
      o.order_date,
      o.quarter,
      o.region,
      o.channel,
      `"${o.product}"`,
      o.customer_type,
      `"${o.sales_rep}"`,
      o.units,
      o.unit_price,
      o.discount_pct,
      o.revenue,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'regional_sales_data_full_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Top App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMemo={() => setIsMemoOpen(true)}
        onDownloadCSV={handleDownloadFullCSV}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'summary' && (
          <ExecutiveSummary onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'waterfall' && <WaterfallBridge />}

        {activeTab === 'drivers' && <DeepDiveDrivers />}

        {activeTab === 'simulator' && <TurnaroundSimulator />}

        {activeTab === 'benchmarks' && <RegionalBenchmarking />}

        {activeTab === 'data' && <OrdersExplorer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">
              Regional Sales Diagnostic Engine
            </span>
            <span aria-hidden="true">·</span>
            <span>West Performance Briefing</span>
            <span aria-hidden="true">·</span>
            <span>FY2026 Q1–Q3 Closed Data</span>
          </div>
          <div>
            Built with rigorous mathematical reconciliation and root-cause analysis
          </div>
        </div>
      </footer>

      {/* Executive Briefing Memorandum Modal */}
      <ExecutiveMemoModal
        isOpen={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
      />
    </div>
  );
}
