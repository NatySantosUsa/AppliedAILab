import React, { useState } from 'react';
import { ALL_ORDERS, OrderRecord } from '../data/salesData';
import {
  computeWestProductDeltas,
  computeWestChannelDeltas,
  computeWestRepDeltas,
  formatCurrency,
  formatPercent,
} from '../utils/analytics';
import {
  Package,
  Building2,
  Users,
  Percent,
  AlertCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const DeepDiveDrivers: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'channels' | 'discounts' | 'customers'>(
    'products'
  );

  const westOrders = ALL_ORDERS.filter((o) => o.region === 'West');
  const westQ2 = westOrders.filter((o) => o.quarter === 'Q2');
  const westQ3 = westOrders.filter((o) => o.quarter === 'Q3');

  const productDeltas = computeWestProductDeltas(ALL_ORDERS);
  const channelDeltas = computeWestChannelDeltas(ALL_ORDERS);
  const repDeltas = computeWestRepDeltas(ALL_ORDERS);

  // High discount orders in Q3 West (>=15%)
  const highDiscountOrders = westQ3.filter((o) => o.discount_pct >= 15);

  return (
    <div className="space-y-6">
      {/* Subtab selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('products')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'products'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            1. Product Mix Shift
          </button>

          <button
            onClick={() => setActiveSubTab('channels')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'channels'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            2. Channel &amp; Rep Divergence
          </button>

          <button
            onClick={() => setActiveSubTab('discounts')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'discounts'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Percent className="w-4 h-4" />
            3. Pricing &amp; Discount Leakage
          </button>

          <button
            onClick={() => setActiveSubTab('customers')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSubTab === 'customers'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            4. Customer Acquisition Funnel
          </button>
        </div>
      </div>

      {/* Subtab 1: Products */}
      {activeSubTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">
              Product Mix Evolution (West Region)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Analysis of volume (units) and realized revenue across all 5 product lines between Q2 and Q3.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="text-xs font-semibold text-rose-700">Air Fryer XL</span>
                <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
                  -$2,942.75
                </div>
                <div className="text-xs text-rose-600 mt-1">
                  Units collapsed from 34 → 14 (-58.8%)
                </div>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="text-xs font-semibold text-rose-700">Pro Blender</span>
                <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
                  -$1,597.05
                </div>
                <div className="text-xs text-rose-600 mt-1">
                  Revenue down -27.0% despite heavy discounts
                </div>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-xs font-semibold text-emerald-700">Knife Set</span>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                  +$2,790.55
                </div>
                <div className="text-xs text-emerald-600 mt-1">
                  Units surged 11 → 35 (+218%), but lower ticket ($119)
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-y border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-right">List Price</th>
                    <th className="px-4 py-3 text-right">Q2 Units</th>
                    <th className="px-4 py-3 text-right">Q3 Units</th>
                    <th className="px-4 py-3 text-right">Unit Delta</th>
                    <th className="px-4 py-3 text-right">Q2 Revenue</th>
                    <th className="px-4 py-3 text-right">Q3 Revenue</th>
                    <th className="px-4 py-3 text-right">Rev Delta</th>
                    <th className="px-4 py-3 text-right">% Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {productDeltas.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-sans font-medium text-slate-900">
                        {p.product}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {formatCurrency(p.avgPrice)}
                      </td>
                      <td className="px-4 py-3 text-right">{p.q2Units}</td>
                      <td className="px-4 py-3 text-right">{p.q3Units}</td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          p.deltaUnits < 0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {p.deltaUnits > 0 ? '+' : ''}
                        {p.deltaUnits}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(p.q2Revenue)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(p.q3Revenue)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-bold ${
                          p.deltaRevenue < 0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {p.deltaRevenue > 0 ? '+' : ''}
                        {formatCurrency(p.deltaRevenue)}
                      </td>
                      <td className="px-4 py-3 text-right">{formatPercent(p.pctChange)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Channels & Reps */}
      {activeSubTab === 'channels' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">
              Channel Dynamics &amp; Sales Rep Performance Disconnect
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Detailed inspection of West commercial channels and sales rep accounts.
            </p>

            {/* Rep comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* T. Nguyen */}
              <div className="border border-rose-200 bg-rose-50/30 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-rose-700 uppercase">
                      Sales Rep Analysis
                    </span>
                    <h4 className="text-base font-bold text-slate-900">T. Nguyen</h4>
                  </div>
                  <span className="text-lg font-bold font-mono text-rose-600">
                    -$3,363.50 (-27.8%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Total Revenue fell from <strong>$12,091.05</strong> to <strong>$8,727.55</strong>.
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span className="font-medium text-slate-700">Partner Channel:</span>
                    <span className="font-mono text-rose-600 font-semibold">
                      $7,341.80 → $2,025.30 (-$5,316.50 / -72.4%)
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-100 flex justify-between">
                    <span className="font-medium text-slate-700">Retail Channel:</span>
                    <span className="font-mono text-slate-700">
                      $2,626.25 → $2,493.70 (-$132.55)
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-emerald-100 flex justify-between">
                    <span className="font-medium text-slate-700">Online Channel:</span>
                    <span className="font-mono text-emerald-600 font-semibold">
                      $2,123.00 → $4,208.55 (+$2,085.55 / +98.2%)
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-500 italic">
                  Key Insight: Nguyen picked up online fulfillment orders, but his wholesale partner base completely evaporated in Q3.
                </div>
              </div>

              {/* J. Ortiz */}
              <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 uppercase">
                      Sales Rep Analysis
                    </span>
                    <h4 className="text-base font-bold text-slate-900">J. Ortiz</h4>
                  </div>
                  <span className="text-lg font-bold font-mono text-emerald-600">
                    +$841.45 (+9.8%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Total Revenue grew from <strong>$8,618.70</strong> to <strong>$9,460.15</strong>.
                </p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded border border-emerald-100 flex justify-between">
                    <span className="font-medium text-slate-700">Partner Channel:</span>
                    <span className="font-mono text-emerald-600 font-semibold">
                      $2,253.15 → $5,599.10 (+$3,345.95 / +148.5%)
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-100 flex justify-between">
                    <span className="font-medium text-slate-700">Retail Channel:</span>
                    <span className="font-mono text-slate-700">
                      $2,524.60 → $2,140.50 (-$384.10)
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span className="font-medium text-slate-700">Online Channel:</span>
                    <span className="font-mono text-rose-600 font-semibold">
                      $3,840.95 → $1,720.55 (-$2,120.40 / -55.2%)
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-500 italic">
                  Key Insight: Ortiz successfully closed 3 large wholesale partner deals (Smart Kettle, Air Fryer, Blender), showing partner sales are achievable in the West.
                </div>
              </div>
            </div>

            {/* Channels Summary Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-y border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3 text-right">Q2 Orders</th>
                    <th className="px-4 py-3 text-right">Q3 Orders</th>
                    <th className="px-4 py-3 text-right">Q2 Revenue</th>
                    <th className="px-4 py-3 text-right">Q3 Revenue</th>
                    <th className="px-4 py-3 text-right">Revenue Change</th>
                    <th className="px-4 py-3 text-right">% Change</th>
                    <th className="px-4 py-3 text-right">Deficit Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {channelDeltas.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-sans font-medium text-slate-900">
                        {ch.channel}
                      </td>
                      <td className="px-4 py-3 text-right">{ch.q2Orders}</td>
                      <td className="px-4 py-3 text-right">{ch.q3Orders}</td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(ch.q2Revenue)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {formatCurrency(ch.q3Revenue)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-bold ${
                          ch.deltaRevenue < 0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {ch.deltaRevenue > 0 ? '+' : ''}
                        {formatCurrency(ch.deltaRevenue)}
                      </td>
                      <td className="px-4 py-3 text-right">{formatPercent(ch.pctChange)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {ch.deltaRevenue < 0
                          ? `${((ch.deltaRevenue / -2522.05) * 100).toFixed(1)}%`
                          : '0.0%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Discounts */}
      {activeSubTab === 'discounts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                  Pricing &amp; Margin Audit
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Pro Blender Discount Inefficiency in Q3
                </h3>
              </div>
              <div className="text-xs font-mono px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md">
                West Avg Discount: 3.37% (Q2) → 6.63% (Q3)
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              In Q1 and Q2, West orders were capped at 0%–10% discount. In Q3, sales reps began discounting Pro Blender at <strong>15%, 20%, and 25%</strong> across 10 separate transactions. This surrendered <strong>+$854.05 in margin</strong>, yet total Pro Blender volume in West still declined from 32 to 28 units.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-y border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Rep</th>
                    <th className="px-4 py-3 text-right">Units</th>
                    <th className="px-4 py-3 text-right">List Price</th>
                    <th className="px-4 py-3 text-right">Discount %</th>
                    <th className="px-4 py-3 text-right">Realized Revenue</th>
                    <th className="px-4 py-3 text-right">Margin Surrendered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {highDiscountOrders.map((ord, idx) => {
                    const listVal = ord.units * ord.unit_price;
                    const surrendered = listVal - ord.revenue;
                    return (
                      <tr key={idx} className="hover:bg-purple-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{ord.order_id}</td>
                        <td className="px-4 py-3 text-slate-600">{ord.order_date}</td>
                        <td className="px-4 py-3 font-sans text-slate-700">{ord.channel}</td>
                        <td className="px-4 py-3 font-sans text-slate-700">{ord.sales_rep}</td>
                        <td className="px-4 py-3 text-right">{ord.units}</td>
                        <td className="px-4 py-3 text-right text-slate-600">
                          {formatCurrency(listVal)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-rose-600">
                          {ord.discount_pct}%
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          {formatCurrency(ord.revenue)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-rose-700">
                          -{formatCurrency(surrendered)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-purple-50/70 font-mono font-bold text-slate-900 border-t border-purple-200">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 font-sans">
                      Total High-Discount Impact (10 Orders)
                    </td>
                    <td className="px-4 py-3 text-right">
                      {highDiscountOrders.reduce((s, o) => s + o.units, 0)} units
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(
                        highDiscountOrders.reduce((s, o) => s + o.units * o.unit_price, 0)
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-rose-700">18.5% avg</td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(highDiscountOrders.reduce((s, o) => s + o.revenue, 0))}
                    </td>
                    <td className="px-4 py-3 text-right text-rose-700">
                      -
                      {formatCurrency(
                        highDiscountOrders.reduce(
                          (s, o) => s + (o.units * o.unit_price - o.revenue),
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Customers */}
      {activeSubTab === 'customers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">
              Customer Funnel: New vs. Returning Accounts
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Top-of-funnel customer acquisition stalled in West while existing accounts maintained order frequency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-rose-200 bg-rose-50/40 rounded-xl p-5">
                <span className="text-xs font-semibold text-rose-700 uppercase">
                  Top-of-Funnel Pipeline
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">New Customers</h4>
                <div className="text-2xl font-bold font-mono text-rose-600 mt-2">
                  -$3,880.40 (-44.1%)
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Q2 New Customer Revenue:</span>
                    <span className="font-mono font-medium">$8,803.50 (18 orders)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Q3 New Customer Revenue:</span>
                    <span className="font-mono font-medium">$4,923.10 (12 orders)</span>
                  </div>
                  <div className="flex justify-between font-bold text-rose-700 pt-1 border-t border-rose-200">
                    <span>Net Drop:</span>
                    <span className="font-mono">-$3,880.40 (-6 orders)</span>
                  </div>
                </div>
              </div>

              <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-5">
                <span className="text-xs font-semibold text-emerald-700 uppercase">
                  Account Retention
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">Returning Customers</h4>
                <div className="text-2xl font-bold font-mono text-emerald-600 mt-2">
                  +$1,358.35 (+11.4%)
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Q2 Returning Revenue:</span>
                    <span className="font-mono font-medium">$11,906.25 (28 orders)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Q3 Returning Revenue:</span>
                    <span className="font-mono font-medium">$13,264.60 (34 orders)</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700 pt-1 border-t border-emerald-200">
                    <span>Net Growth:</span>
                    <span className="font-mono">+$1,358.35 (+6 orders)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
              <strong>Strategic Takeaway:</strong> Existing accounts remain loyal, but without fresh wholesale and retail buyers entering the pipeline, the West region cannot offset product mix transitions or account attrition. Action 2 (Bundle campaigns) specifically targets this gap.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
