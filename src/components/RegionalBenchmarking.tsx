import React from 'react';
import { ALL_ORDERS } from '../data/salesData';
import { computeRegionalSummaries, formatCurrency, formatPercent } from '../utils/analytics';
import { BarChart3, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

export const RegionalBenchmarking: React.FC = () => {
  const summaries = computeRegionalSummaries(ALL_ORDERS);

  // Overall company quarterly sums
  const companyQ1 = summaries.reduce((s, r) => s + r.q1Revenue, 0);
  const companyQ2 = summaries.reduce((s, r) => s + r.q2Revenue, 0);
  const companyQ3 = summaries.reduce((s, r) => s + r.q3Revenue, 0);
  const companyTotal = summaries.reduce((s, r) => s + r.totalRevenue, 0);
  const companyDelta = companyQ3 - companyQ2;

  // Find West
  const westSummary = summaries.find((r) => r.region === 'West')!;

  return (
    <div className="space-y-6">
      {/* High-level callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <h4 className="font-bold text-sm text-amber-950">
              Executive Finding: West Deficit Exceeds Total Company Net Decline
            </h4>
            <p className="leading-relaxed">
              Between Q2 and Q3, total company revenue fell by <strong>-$1,760.05</strong> (from $83,494.25 to $81,734.20).
              However, the West region alone contracted by <strong>-$2,522.05</strong>. Because the South expanded by <strong>+$1,065.40</strong> and the North and East remained essentially stable (-0.2% and -1.2%), the company-wide downturn is entirely attributable to the West region failure.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Cross-Regional Performance Comparison (Q1 - Q3 2026)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All 4 sales regions benchmarked across revenue, volume, and quarter-over-quarter trajectory.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">548 Orders Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Region</th>
                <th className="px-6 py-3.5 text-right">Q1 Revenue</th>
                <th className="px-6 py-3.5 text-right">Q2 Revenue</th>
                <th className="px-6 py-3.5 text-right">Q3 Revenue</th>
                <th className="px-6 py-3.5 text-right">Q3 vs Q2 ($)</th>
                <th className="px-6 py-3.5 text-right">Q3 vs Q2 (%)</th>
                <th className="px-6 py-3.5 text-right">9-Month Total</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {summaries.map((reg, idx) => {
                const isWest = reg.region === 'West';
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 ${isWest ? 'bg-rose-50/40 font-semibold' : ''}`}
                  >
                    <td className="px-6 py-4 font-sans font-medium text-slate-900 flex items-center gap-2">
                      {isWest ? (
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                      )}
                      {reg.region} Region {isWest && '(Target Region)'}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700">
                      {formatCurrency(reg.q1Revenue)}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700">
                      {formatCurrency(reg.q2Revenue)}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900 font-bold">
                      {formatCurrency(reg.q3Revenue)}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        reg.q3VsQ2Delta < 0 ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {reg.q3VsQ2Delta > 0 ? '+' : ''}
                      {formatCurrency(reg.q3VsQ2Delta)}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold ${
                        reg.q3VsQ2Pct < 0 ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {formatPercent(reg.q3VsQ2Pct)}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900">
                      {formatCurrency(reg.totalRevenue)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isWest ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                          <TrendingDown className="w-3 h-3" />
                          Critical Fall
                        </span>
                      ) : reg.q3VsQ2Delta >= 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                          <TrendingUp className="w-3 h-3" />
                          Growing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 font-mono font-bold text-white">
              <tr>
                <td className="px-6 py-4 font-sans">Total Company</td>
                <td className="px-6 py-4 text-right">{formatCurrency(companyQ1)}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(companyQ2)}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(companyQ3)}</td>
                <td className="px-6 py-4 text-right text-rose-300">
                  {formatCurrency(companyDelta)}
                </td>
                <td className="px-6 py-4 text-right text-rose-300">
                  {formatPercent((companyDelta / companyQ2) * 100)}
                </td>
                <td className="px-6 py-4 text-right">{formatCurrency(companyTotal)}</td>
                <td className="px-6 py-4 text-center text-xs text-slate-300">Company Total</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Visual Bar Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900">
          Visual Quarterly Trajectory (Q1 vs Q2 vs Q3)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          {summaries.map((s, idx) => {
            const isWest = s.region === 'West';
            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  isWest
                    ? 'border-rose-300 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900">{s.region}</span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      s.q3VsQ2Pct < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {formatPercent(s.q3VsQ2Pct)}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Q1:</span>
                    <span>{formatCurrency(s.q1Revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Q2:</span>
                    <span>{formatCurrency(s.q2Revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-900 font-bold pt-1 border-t border-slate-200">
                    <span>Q3:</span>
                    <span className={isWest ? 'text-rose-600' : ''}>
                      {formatCurrency(s.q3Revenue)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
