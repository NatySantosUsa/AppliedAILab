import React from 'react';
import {
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Users,
  Building2,
  Package,
  Percent,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../utils/analytics';

interface ExecutiveSummaryProps {
  onNavigateTab: (tabId: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-8">
      {/* Primary KPI Hero Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Executive Finding · West Region Q3 Decline
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
              West Revenue fell by <span className="text-rose-400 font-mono">-$2,522.05</span> (-12.18%) in Q3
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
              West dropped from <span className="text-white font-medium">$20,709.75 in Q2</span> to{' '}
              <span className="text-white font-medium">$18,187.70 in Q3</span> (and -$3,867.70 or -17.53% from its Q1 peak of $22,055.40).
              West slipped from the #2 revenue generator in the company down to #4 (last place), even as the South region grew +5.8% and the North held steady (-0.2%).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Q2 to Q3 Dollar Drop</span>
              <span className="text-2xl font-bold font-mono text-rose-400">-$2,522.05</span>
              <span className="text-xs text-slate-400 block mt-0.5">-12.18% quarter-over-quarter</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Q1 Peak to Q3 Drop</span>
              <span className="text-2xl font-bold font-mono text-slate-200">-$3,867.70</span>
              <span className="text-xs text-slate-400 block mt-0.5">-17.53% 6-month decline</span>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Partner Channel Deficit</div>
            <div className="text-lg font-bold font-mono text-rose-400 mt-1">-$1,970.55</div>
            <div className="text-xs text-slate-400 mt-0.5">78.1% of entire regional loss</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Air Fryer XL Collapse</div>
            <div className="text-lg font-bold font-mono text-rose-400 mt-1">-$2,942.75</div>
            <div className="text-xs text-slate-400 mt-0.5">-60.6% revenue drop (14 vs 34 units)</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">New Customer Contraction</div>
            <div className="text-lg font-bold font-mono text-rose-400 mt-1">-$3,880.40</div>
            <div className="text-xs text-slate-400 mt-0.5">-44.1% pipeline drop</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Discount Margin Leakage</div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-1">+$854.05</div>
            <div className="text-xs text-slate-400 mt-0.5">Avg discount 3.4% → 6.6%</div>
          </div>
        </div>
      </div>

      {/* Section 1: The Numbers Behind Why West Fell */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Diagnostic Analysis
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Why West Revenue Fell: 4 Core Drivers &amp; Underlying Numbers
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('waterfall')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View Interactive Waterfall Bridge
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Driver 1 */}
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-700 rounded-md shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-rose-700">Driver 1 · Channel Shift</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  Partner Channel Collapse (-$1,970.55 / -20.5%)
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  The Partner wholesale channel plummeted from <strong>$9,594.95</strong> in Q2 to <strong>$7,624.40</strong> in Q3. This single channel accounts for <strong>78.1%</strong> of the entire West revenue deficit.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span>• Rep T. Nguyen Partner:</span>
                    <span className="font-mono font-medium text-rose-600">$7,341.80 → $2,025.30 (-$5,316.50 / -72.4%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Rep J. Ortiz Partner:</span>
                    <span className="font-mono font-medium text-emerald-600">$2,253.15 → $5,599.10 (+$3,345.95)</span>
                  </div>
                  <p className="text-slate-500 italic mt-1">
                    Ortiz gained partner accounts, but Nguyen suffered massive partner churn/inactivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver 2 */}
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-md shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-700">Driver 2 · Product Mix Shift</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  High-Ticket Appliance Drop (-$4,539.80 combined)
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Demand shifted sharply away from premium cooking equipment into low-ticket items. Knife Set surged +224% (+24 units, +$2,790.55), but at $119 it could not make up for the massive crater in Air Fryers and Blenders.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span>• Air Fryer XL ($149):</span>
                    <span className="font-mono font-medium text-rose-600">$4,857.40 → $1,914.65 (-$2,942.75 / -60.6%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Pro Blender ($189):</span>
                    <span className="font-mono font-medium text-rose-600">$5,915.70 → $4,318.65 (-$1,597.05 / -27.0%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Smart Kettle ($79):</span>
                    <span className="font-mono font-medium text-rose-600">$2,658.35 → $1,718.25 (-$940.10 / -35.4%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Driver 3 */}
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-md shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-700">Driver 3 · Pipeline Contraction</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  New Customer Acquisition Plunge (-$3,880.40 / -44.1%)
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Revenue from <strong>New Customers</strong> fell off a cliff in West, dropping from <strong>$8,803.50</strong> in Q2 to <strong>$4,923.10</strong> in Q3. West sales reps failed to feed the top-of-funnel pipeline.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span>• New Customers:</span>
                    <span className="font-mono font-medium text-rose-600">$8,803.50 → $4,923.10 (-$3,880.40 / -44.1%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Returning Customers:</span>
                    <span className="font-mono font-medium text-emerald-600">$11,906.25 → $13,264.60 (+$1,358.35 / +11.4%)</span>
                  </div>
                  <p className="text-slate-500 italic mt-1">
                    Loyal existing accounts grew, but West lost momentum acquiring new retail and wholesale clients.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver 4 */}
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-md shrink-0">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-700">Driver 4 · Price Realization</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  Deep Discounting on Pro Blender Bleeds Margin (+$854.05 Surrendered)
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  West average discount nearly doubled from <strong>3.37% in Q2</strong> to <strong>6.63% in Q3</strong>. Ten separate orders were sold at deep 15%, 20%, and 25% discounts (all Pro Blenders), surrendering $854 in extra pricing concessions without increasing overall units.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span>• Q2 List vs Realized:</span>
                    <span className="font-mono text-slate-600">List $21,402.00 | Discounts Given: $692.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Q3 List vs Realized:</span>
                    <span className="font-mono text-slate-600">List $19,734.00 | Discounts Given: $1,546.30</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>• Net Concession Increase:</span>
                    <span className="font-mono text-rose-600">+$854.05 in margin lost to price cuts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Two Concrete Suggested Actions */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Strategic Turnaround Plan
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-1">
          Two High-Impact Recommended Actions for Executive Leadership
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Targeted interventions designed to immediately arrest the West region revenue decline and deliver +$4,500 to +$7,000 in recovered revenue in Q4 2026.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Action 1 Card */}
          <div className="border-2 border-emerald-500/20 bg-emerald-50/30 rounded-xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-700 text-white">
                  Action 1 · Channel Recovery
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-700">
                  Target: +$3,500/Qtr
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mt-3">
                West Partner Account Re-engagement &amp; Joint-Coverage Realignment
              </h4>

              <div className="text-xs text-slate-700 mt-3 space-y-2.5 leading-relaxed">
                <p>
                  <strong>Root Problem Addressed:</strong> T. Nguyen lost $5,316.50 in partner revenue in Q3 (dropping from 9 bulk partner orders to only 3), while J. Ortiz grew partner sales by $3,346.
                </p>

                <div className="bg-white/80 p-3 rounded-lg border border-emerald-200/60 space-y-1.5">
                  <div className="font-semibold text-slate-900">Execution Roadmap:</div>
                  <p>
                    <strong>1. 14-Day Wholesale Account Audit:</strong> Mandate a formal review of all West commercial partners who ordered in Q1/Q2 but paused in Q3 (specifically investigating inventory stockouts, competitor displacement, or service issues).
                  </p>
                  <p>
                    <strong>2. Rep Co-Coverage Model:</strong> Pair J. Ortiz (who has demonstrated strong partner traction, up +148% in Q3) to co-manage T. Nguyen's legacy wholesale accounts.
                  </p>
                  <p>
                    <strong>3. Tiered Q4 Wholesale Incentives:</strong> Implement structured volume tiers for bulk orders (e.g. 5+ units of Air Fryer XL or Pro Blender) with rebate credits rather than upfront price erosion.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600">Projected Financial Impact:</span>
              <span className="font-bold text-emerald-800 font-mono">
                Recover 50-70% of lost partner volume (+~$2,600 – $3,700)
              </span>
            </div>
          </div>

          {/* Action 2 Card */}
          <div className="border-2 border-indigo-500/20 bg-indigo-50/30 rounded-xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-700 text-white">
                  Action 2 · Pricing &amp; Bundling
                </span>
                <span className="text-xs font-mono font-semibold text-indigo-700">
                  Target: +$2,800/Qtr
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mt-3">
                Enforce a 10% Discount Ceiling &amp; Launch "Appliance + Knife" Bundles
              </h4>

              <div className="text-xs text-slate-700 mt-3 space-y-2.5 leading-relaxed">
                <p>
                  <strong>Root Problem Addressed:</strong> Sales reps gave 15%-25% discounts on Pro Blenders (leaking $854+ with negative unit elasticity) while Air Fryer XL sales collapsed -60.6% and new customer revenue cratered -44.1%.
                </p>

                <div className="bg-white/80 p-3 rounded-lg border border-indigo-200/60 space-y-1.5">
                  <div className="font-semibold text-slate-900">Execution Roadmap:</div>
                  <p>
                    <strong>1. Mandatory Price Floor (10% Cap):</strong> Immediately disable CRM authority for reps to apply &gt;10% discounts on Pro Blender without Regional Director sign-off, stopping margin erosion.
                  </p>
                  <p>
                    <strong>2. Capitalize on Knife Set Momentum:</strong> Knife Set demand exploded +224% (35 units sold in Q3 vs 11 in Q2). Create a promotional bundle: "Culinary Station Bundle" combining the sluggish Air Fryer XL ($149) or Pro Blender ($189) with the popular Knife Set ($119) at a bundled 10% discount.
                  </p>
                  <p>
                    <strong>3. New Customer Activation Campaign:</strong> Target West culinary retail accounts and online ads with the bundle to re-ignite the stalled new customer acquisition engine.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-indigo-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600">Projected Financial Impact:</span>
              <span className="font-bold text-indigo-800 font-mono">
                +$850 saved margin + ~$2,000 incremental bundle revenue
              </span>
            </div>
          </div>
        </div>

        {/* Turnaround Simulator Teaser */}
        <div className="mt-6 p-4 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-md">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h5 className="text-sm font-semibold">Interactive What-If Scenario Simulator</h5>
              <p className="text-xs text-slate-400">
                Adjust partner recovery rates and bundle adoption to test Q4 financial projections in real time.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('simulator')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            Launch Simulator
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
