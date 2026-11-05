import React, { useState } from 'react';
import { ALL_ORDERS } from '../data/salesData';
import {
  computeWestWaterfall,
  computeWestChannelDeltas,
  computeWestRepDeltas,
  formatCurrency,
  formatPercent,
} from '../utils/analytics';
import { ArrowDownRight, ArrowUpRight, BarChart2, Layers } from 'lucide-react';

export const WaterfallBridge: React.FC = () => {
  const [bridgeType, setBridgeType] = useState<'product' | 'channel' | 'rep'>('product');

  // Compute West totals
  const westOrders = ALL_ORDERS.filter((o) => o.region === 'West');
  const q2Orders = westOrders.filter((o) => o.quarter === 'Q2');
  const q3Orders = westOrders.filter((o) => o.quarter === 'Q3');
  const q2Rev = q2Orders.reduce((s, o) => s + o.revenue, 0);
  const q3Rev = q3Orders.reduce((s, o) => s + o.revenue, 0);
  const netDelta = q3Rev - q2Rev;

  // Build steps depending on bridgeType
  const productSteps = computeWestWaterfall(ALL_ORDERS);

  const channelDeltas = computeWestChannelDeltas(ALL_ORDERS);
  const repDeltas = computeWestRepDeltas(ALL_ORDERS);

  let currentSteps: {
    name: string;
    amount: number;
    type: 'base' | 'negative' | 'positive' | 'total';
    runningTotal: number;
    subtext: string;
  }[] = [];

  if (bridgeType === 'product') {
    currentSteps = productSteps.map((s) => ({
      name: s.name,
      amount: s.amount,
      type: s.type,
      runningTotal: s.runningTotal,
      subtext: s.description,
    }));
  } else if (bridgeType === 'channel') {
    let running = q2Rev;
    currentSteps.push({
      name: 'Q2 West Revenue',
      amount: q2Rev,
      type: 'base',
      runningTotal: running,
      subtext: 'Q2 Starting Baseline',
    });
    channelDeltas.forEach((ch) => {
      running += ch.deltaRevenue;
      currentSteps.push({
        name: `${ch.channel} Channel`,
        amount: ch.deltaRevenue,
        type: ch.deltaRevenue < 0 ? 'negative' : 'positive',
        runningTotal: running,
        subtext: `Q2: ${formatCurrency(ch.q2Revenue)} → Q3: ${formatCurrency(ch.q3Revenue)} (${ch.pctChange.toFixed(1)}%)`,
      });
    });
    currentSteps.push({
      name: 'Q3 West Revenue',
      amount: q3Rev,
      type: 'total',
      runningTotal: q3Rev,
      subtext: 'Q3 Closed Revenue',
    });
  } else {
    let running = q2Rev;
    currentSteps.push({
      name: 'Q2 West Revenue',
      amount: q2Rev,
      type: 'base',
      runningTotal: running,
      subtext: 'Q2 Starting Baseline',
    });
    repDeltas.forEach((rep) => {
      running += rep.deltaRevenue;
      currentSteps.push({
        name: `Rep: ${rep.rep}`,
        amount: rep.deltaRevenue,
        type: rep.deltaRevenue < 0 ? 'negative' : 'positive',
        runningTotal: running,
        subtext: `Q2: ${formatCurrency(rep.q2Revenue)} → Q3: ${formatCurrency(rep.q3Revenue)} (${rep.pctChange.toFixed(1)}%)`,
      });
    });
    currentSteps.push({
      name: 'Q3 West Revenue',
      amount: q3Rev,
      type: 'total',
      runningTotal: q3Rev,
      subtext: 'Q3 Closed Revenue',
    });
  }

  // Max value for scale calculation
  const maxScale = Math.max(q2Rev, q3Rev, 24000);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Financial Variance Decomposition
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              West Region Revenue Bridge (Q2 → Q3 2026)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Exact financial reconciliation showing how the <span className="font-mono font-semibold text-rose-600">-$2,522.05</span> deficit materialized.
            </p>
          </div>

          {/* Bridge Dimension Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setBridgeType('product')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                bridgeType === 'product'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Product
            </button>
            <button
              onClick={() => setBridgeType('channel')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                bridgeType === 'channel'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Channel
            </button>
            <button
              onClick={() => setBridgeType('rep')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                bridgeType === 'rep'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Sales Rep
            </button>
          </div>
        </div>

        {/* Visual Waterfall Bars */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="min-w-[650px] space-y-4">
            {currentSteps.map((step, idx) => {
              const isBaseOrTotal = step.type === 'base' || step.type === 'total';
              const isNegative = step.type === 'negative';
              const isPositive = step.type === 'positive';

              // Visual bar representation
              const barWidthPercent = (Math.abs(step.amount) / maxScale) * 100;
              const runningPercent = (step.runningTotal / maxScale) * 100;

              return (
                <div key={idx} className="flex items-center gap-4 text-xs">
                  {/* Step Name */}
                  <div className="w-36 text-right font-medium text-slate-800 shrink-0 truncate">
                    {step.name}
                  </div>

                  {/* Waterfall Bar Track */}
                  <div className="flex-1 bg-slate-50 h-8 rounded border border-slate-200 relative overflow-hidden flex items-center px-2">
                    {isBaseOrTotal && (
                      <div
                        className="h-full absolute left-0 top-0 bg-slate-800 rounded-l"
                        style={{ width: `${barWidthPercent}%` }}
                      />
                    )}

                    {isNegative && (
                      <div
                        className="h-full absolute bg-rose-500/80 rounded"
                        style={{
                          left: `${Math.max(0, runningPercent)}%`,
                          width: `${barWidthPercent}%`,
                        }}
                      />
                    )}

                    {isPositive && (
                      <div
                        className="h-full absolute bg-emerald-500/80 rounded"
                        style={{
                          left: `${Math.max(0, runningPercent - barWidthPercent)}%`,
                          width: `${barWidthPercent}%`,
                        }}
                      />
                    )}

                    {/* Step label on bar */}
                    <div className="relative z-10 flex items-center justify-between w-full font-mono text-[11px]">
                      <span className={`${isBaseOrTotal ? 'text-white pl-2' : 'text-slate-800'}`}>
                        {step.subtext}
                      </span>
                      <span
                        className={`font-semibold ${
                          isBaseOrTotal
                            ? 'text-white pr-2'
                            : isNegative
                            ? 'text-rose-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {isBaseOrTotal
                          ? formatCurrency(step.amount)
                          : `${step.amount > 0 ? '+' : ''}${formatCurrency(step.amount)}`}
                      </span>
                    </div>
                  </div>

                  {/* Running Balance */}
                  <div className="w-24 text-right font-mono font-medium text-slate-700 shrink-0">
                    {formatCurrency(step.runningTotal)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footnote / Summary of Bridge */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 inline-block" />
              Baseline / Close
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
              Negative Drag
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              Positive Contribution
            </span>
          </div>

          <div className="font-mono">
            Net West Variance: <span className="font-bold text-rose-600">-$2,522.05 (-12.18%)</span>
          </div>
        </div>
      </div>

      {/* Numerical Bridge Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">
            Granular Breakdown Table ({bridgeType.toUpperCase()})
          </h4>
          <span className="text-xs text-slate-500">Values in USD</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Component</th>
                <th className="px-6 py-3 text-right">Q2 Revenue</th>
                <th className="px-6 py-3 text-right">Q3 Revenue</th>
                <th className="px-6 py-3 text-right">Dollar Variance</th>
                <th className="px-6 py-3 text-right">% Change</th>
                <th className="px-6 py-3 text-right">Impact on Total Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {bridgeType === 'product' &&
                computeWestWaterfall(ALL_ORDERS)
                  .filter((s) => s.type !== 'base' && s.type !== 'total')
                  .map((item, i) => {
                    const prodMatch = ALL_ORDERS.filter(
                      (o) => o.region === 'West' && o.product === item.name
                    );
                    const q2R = prodMatch
                      .filter((o) => o.quarter === 'Q2')
                      .reduce((s, o) => s + o.revenue, 0);
                    const q3R = prodMatch
                      .filter((o) => o.quarter === 'Q3')
                      .reduce((s, o) => s + o.revenue, 0);
                    const pctOfVariance = (item.amount / netDelta) * 100;

                    return (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3.5 font-sans font-medium text-slate-900 flex items-center gap-2">
                          {item.amount < 0 ? (
                            <ArrowDownRight className="w-4 h-4 text-rose-600" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                          )}
                          {item.name}
                        </td>
                        <td className="px-6 py-3.5 text-right text-slate-700">
                          {formatCurrency(q2R)}
                        </td>
                        <td className="px-6 py-3.5 text-right text-slate-700">
                          {formatCurrency(q3R)}
                        </td>
                        <td
                          className={`px-6 py-3.5 text-right font-semibold ${
                            item.amount < 0 ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {item.amount > 0 ? '+' : ''}
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="px-6 py-3.5 text-right text-slate-700">
                          {formatPercent(((q3R - q2R) / q2R) * 100)}
                        </td>
                        <td className="px-6 py-3.5 text-right font-semibold text-slate-800">
                          {pctOfVariance.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}

              {bridgeType === 'channel' &&
                channelDeltas.map((ch, i) => {
                  const pctOfVariance = (ch.deltaRevenue / netDelta) * 100;
                  return (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5 font-sans font-medium text-slate-900 flex items-center gap-2">
                        {ch.deltaRevenue < 0 ? (
                          <ArrowDownRight className="w-4 h-4 text-rose-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        )}
                        {ch.channel} Channel
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatCurrency(ch.q2Revenue)}
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatCurrency(ch.q3Revenue)}
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-semibold ${
                          ch.deltaRevenue < 0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {ch.deltaRevenue > 0 ? '+' : ''}
                        {formatCurrency(ch.deltaRevenue)}
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatPercent(ch.pctChange)}
                      </td>
                      <td className="px-6 py-3.5 text-right font-semibold text-slate-800">
                        {pctOfVariance.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}

              {bridgeType === 'rep' &&
                repDeltas.map((rep, i) => {
                  const pctOfVariance = (rep.deltaRevenue / netDelta) * 100;
                  return (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5 font-sans font-medium text-slate-900 flex items-center gap-2">
                        {rep.deltaRevenue < 0 ? (
                          <ArrowDownRight className="w-4 h-4 text-rose-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        )}
                        {rep.rep}
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatCurrency(rep.q2Revenue)}
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatCurrency(rep.q3Revenue)}
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-semibold ${
                          rep.deltaRevenue < 0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {rep.deltaRevenue > 0 ? '+' : ''}
                        {formatCurrency(rep.deltaRevenue)}
                      </td>
                      <td className="px-6 py-3.5 text-right text-slate-700">
                        {formatPercent(rep.pctChange)}
                      </td>
                      <td className="px-6 py-3.5 text-right font-semibold text-slate-800">
                        {pctOfVariance.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot className="bg-slate-100 font-mono font-bold text-slate-900 border-t border-slate-200">
              <tr>
                <td className="px-6 py-3 font-sans">West Total</td>
                <td className="px-6 py-3 text-right">{formatCurrency(q2Rev)}</td>
                <td className="px-6 py-3 text-right">{formatCurrency(q3Rev)}</td>
                <td className="px-6 py-3 text-right text-rose-600 font-bold">
                  {formatCurrency(netDelta)}
                </td>
                <td className="px-6 py-3 text-right text-rose-600 font-bold">
                  {formatPercent((netDelta / q2Rev) * 100)}
                </td>
                <td className="px-6 py-3 text-right">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
