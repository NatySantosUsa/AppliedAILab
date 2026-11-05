import React, { useState, useId } from 'react';
import { formatCurrency, formatPercent } from '../utils/analytics';
import { Sparkles, Sliders, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';

export const TurnaroundSimulator: React.FC = () => {
  // Baseline Q3 numbers
  const q3WestBaseline = 18187.70;
  const q2WestBaseline = 20709.75;
  const q1WestPeak = 22055.40;
  const lostPartnerPotential = 5316.50; // T. Nguyen's partner decline
  const discountSurrendered = 854.05; // Extra discount given away in Q3

  // Sliders
  const [partnerRecoveryPct, setPartnerRecoveryPct] = useState<number>(60); // 60% default
  const [discountCapCompliance, setDiscountCapCompliance] = useState<number>(85); // 85% default
  const [bundleUnitsSold, setBundleUnitsSold] = useState<number>(15); // 15 bundles
  const [newCustomerRebound, setNewCustomerRebound] = useState<number>(8); // 8 new customer orders

  const partnerRecoveryId = useId();
  const discountCapId = useId();
  const bundleUnitsId = useId();
  const newCustomerId = useId();

  // Calculations
  const recoveredPartnerRevenue = (partnerRecoveryPct / 100) * lostPartnerPotential;
  const recoveredDiscountMargin = (discountCapCompliance / 100) * discountSurrendered;
  // Bundle: Air Fryer XL ($149) + Knife Set ($119) = $268 list - 10% discount ($26.80) = $241.20 per bundle
  const bundleRevenue = bundleUnitsSold * 241.20;
  // Avg new customer order value in Q2 was $8,803.50 / 18 orders = $489.08
  const newCustomerRevenue = newCustomerRebound * 489.08;

  const totalIncrementalRevenue =
    recoveredPartnerRevenue + recoveredDiscountMargin + bundleRevenue + newCustomerRevenue;
  const projectedQ4Revenue = q3WestBaseline + totalIncrementalRevenue;
  const deltaVsQ2 = projectedQ4Revenue - q2WestBaseline;
  const deltaVsQ3 = projectedQ4Revenue - q3WestBaseline;
  const growthVsQ3Pct = (deltaVsQ3 / q3WestBaseline) * 100;

  const handleReset = () => {
    setPartnerRecoveryPct(60);
    setDiscountCapCompliance(85);
    setBundleUnitsSold(15);
    setNewCustomerRebound(8);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              Strategic Planning Tool
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              West Q4 Turnaround Scenario Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Model the financial outcomes of implementing Action 1 (Partner Recovery) and Action 2 (Discount Cap &amp; Bundling).
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Projection KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-slate-900 text-white rounded-xl">
            <span className="text-xs text-slate-400 block">Projected Q4 West Revenue</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              {formatCurrency(projectedQ4Revenue)}
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              {formatPercent(growthVsQ3Pct)} vs Q3 close
            </span>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-xs text-emerald-700 font-semibold block">Net Recovered Gain</span>
            <span className="text-2xl font-bold font-mono text-emerald-800 mt-1 block">
              +{formatCurrency(totalIncrementalRevenue)}
            </span>
            <span className="text-xs text-emerald-600 mt-0.5 block">
              Above Q3 run-rate
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs text-slate-600 font-semibold block">Variance vs Q2 Baseline</span>
            <span
              className={`text-2xl font-bold font-mono mt-1 block ${
                deltaVsQ2 >= 0 ? 'text-emerald-700' : 'text-slate-800'
              }`}
            >
              {deltaVsQ2 >= 0 ? '+' : ''}
              {formatCurrency(deltaVsQ2)}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {deltaVsQ2 >= 0 ? 'Surpasses Q2 level!' : 'Approaching full parity'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs text-slate-600 font-semibold block">Q1 Peak Gap</span>
            <span className="text-2xl font-bold font-mono text-slate-800 mt-1 block">
              {projectedQ4Revenue >= q1WestPeak ? '+' : ''}
              {formatCurrency(projectedQ4Revenue - q1WestPeak)}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              Benchmark: Q1 peak was $22,055
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-200">
          {/* Lever 1: Partner Account Recovery */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor={partnerRecoveryId} className="text-xs font-bold text-slate-900 block">
                  Action 1A · Partner Account Recovery Rate
                </label>
                <span className="text-[11px] text-slate-500">
                  Targeting T. Nguyen lost $5,316.50 partner base
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-700">
                {partnerRecoveryPct}% ({formatCurrency(recoveredPartnerRevenue)})
              </span>
            </div>
            <input
              id={partnerRecoveryId}
              type="range"
              min="0"
              max="100"
              step="5"
              value={partnerRecoveryPct}
              onChange={(e) => setPartnerRecoveryPct(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (No recovery)</span>
              <span>50% (Joint coverage)</span>
              <span>100% (Full Q2 level)</span>
            </div>
          </div>

          {/* Lever 2: Discount Cap Enforcement */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor={discountCapId} className="text-xs font-bold text-slate-900 block">
                  Action 2A · 10% Discount Cap Compliance
                </label>
                <span className="text-[11px] text-slate-500">
                  Halts 15%-25% concessions on Pro Blender
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-indigo-700">
                {discountCapCompliance}% ({formatCurrency(recoveredDiscountMargin)})
              </span>
            </div>
            <input
              id={discountCapId}
              type="range"
              min="0"
              max="100"
              step="5"
              value={discountCapCompliance}
              onChange={(e) => setDiscountCapCompliance(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Status quo)</span>
              <span>50% (Partial enforcement)</span>
              <span>100% (Strict CRM lock)</span>
            </div>
          </div>

          {/* Lever 3: Appliance + Knife Bundle Sales */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor={bundleUnitsId} className="text-xs font-bold text-slate-900 block">
                  Action 2B · Appliance + Knife Bundle Uptake
                </label>
                <span className="text-[11px] text-slate-500">
                  Air Fryer XL ($149) + Knife Set ($119) @ $241.20 bundle
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-slate-900">
                {bundleUnitsSold} units ({formatCurrency(bundleRevenue)})
              </span>
            </div>
            <input
              id={bundleUnitsId}
              type="range"
              min="0"
              max="40"
              step="1"
              value={bundleUnitsSold}
              onChange={(e) => setBundleUnitsSold(Number(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 bundles</span>
              <span>20 bundles</span>
              <span>40 bundles</span>
            </div>
          </div>

          {/* Lever 4: New Customer Reactivation */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor={newCustomerId} className="text-xs font-bold text-slate-900 block">
                  Action 1B · New Customer Pipeline Reactivation
                </label>
                <span className="text-[11px] text-slate-500">
                  Rebounds new client orders toward Q2 baseline (18 orders)
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-slate-900">
                +{newCustomerRebound} accounts ({formatCurrency(newCustomerRevenue)})
              </span>
            </div>
            <input
              id={newCustomerId}
              type="range"
              min="0"
              max="15"
              step="1"
              value={newCustomerRebound}
              onChange={(e) => setNewCustomerRebound(Number(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 new accounts</span>
              <span>7 accounts</span>
              <span>15 accounts</span>
            </div>
          </div>
        </div>

        {/* Strategic Takeaway Box */}
        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3 text-xs text-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-slate-900">Executive Feasibility Verdict:</div>
            <p>
              By capturing just <strong>{partnerRecoveryPct}% of inactive partner volume</strong> and enforcing the{' '}
              <strong>10% discount cap</strong>, West will generate{' '}
              <strong>+{formatCurrency(recoveredPartnerRevenue + recoveredDiscountMargin)}</strong> in low-friction recovery without increasing sales headcount. Adding modest bundle promotions restores West to full revenue health for Q4.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
