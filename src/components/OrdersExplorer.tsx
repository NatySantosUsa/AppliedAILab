import React, { useState, useMemo } from 'react';
import { ALL_ORDERS, OrderRecord } from '../data/salesData';
import { formatCurrency } from '../utils/analytics';
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export const OrdersExplorer: React.FC = () => {
  // Filter States
  const [regionFilter, setRegionFilter] = useState<string>('West'); // Default to West for immediate relevance
  const [quarterFilter, setQuarterFilter] = useState<string>('All');
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [productFilter, setProductFilter] = useState<string>('All');
  const [repFilter, setRepFilter] = useState<string>('All');
  const [customerFilter, setCustomerFilter] = useState<string>('All');
  const [highDiscountOnly, setHighDiscountOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sorting
  const [sortField, setSortField] = useState<keyof OrderRecord>('order_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Filter options
  const regions = ['All', 'West', 'North', 'East', 'South'];
  const quarters = ['All', 'Q1', 'Q2', 'Q3'];
  const channels = ['All', 'Partner', 'Retail', 'Online'];
  const products = [
    'All',
    'Air Fryer XL',
    'Espresso Mini',
    'Knife Set',
    'Pro Blender',
    'Smart Kettle',
  ];
  const reps = useMemo(() => {
    const list = Array.from(new Set(ALL_ORDERS.map((o) => o.sales_rep))).sort();
    return ['All', ...list];
  }, []);

  // Filtered and sorted data
  const filteredOrders = useMemo(() => {
    return ALL_ORDERS.filter((order) => {
      if (regionFilter !== 'All' && order.region !== regionFilter) return false;
      if (quarterFilter !== 'All' && order.quarter !== quarterFilter) return false;
      if (channelFilter !== 'All' && order.channel !== channelFilter) return false;
      if (productFilter !== 'All' && order.product !== productFilter) return false;
      if (repFilter !== 'All' && order.sales_rep !== repFilter) return false;
      if (customerFilter !== 'All' && order.customer_type !== customerFilter) return false;
      if (highDiscountOnly && order.discount_pct < 15) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = order.order_id.toLowerCase().includes(q);
        const matchRep = order.sales_rep.toLowerCase().includes(q);
        const matchProd = order.product.toLowerCase().includes(q);
        if (!matchId && !matchRep && !matchProd) return false;
      }

      return true;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      } else {
        return sortDirection === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      }
    });
  }, [
    regionFilter,
    quarterFilter,
    channelFilter,
    productFilter,
    repFilter,
    customerFilter,
    highDiscountOnly,
    searchQuery,
    sortField,
    sortDirection,
  ]);

  // Aggregate metrics of filtered set
  const filteredRevenue = useMemo(
    () => filteredOrders.reduce((sum, o) => sum + o.revenue, 0),
    [filteredOrders]
  );
  const filteredUnits = useMemo(
    () => filteredOrders.reduce((sum, o) => sum + o.units, 0),
    [filteredOrders]
  );
  const avgDiscount = useMemo(() => {
    if (filteredOrders.length === 0) return 0;
    return filteredOrders.reduce((sum, o) => sum + o.discount_pct, 0) / filteredOrders.length;
  }, [filteredOrders]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  const handleSort = (field: keyof OrderRecord) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setPage(1);
  };

  const resetFilters = () => {
    setRegionFilter('West');
    setQuarterFilter('All');
    setChannelFilter('All');
    setProductFilter('All');
    setRepFilter('All');
    setCustomerFilter('All');
    setHighDiscountOnly(false);
    setSearchQuery('');
    setPage(1);
  };

  const exportFilteredCSV = () => {
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
    const rows = filteredOrders.map((o) => [
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
    link.setAttribute('download', `sales_orders_filtered_${regionFilter}_${quarterFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Transaction Explorer &amp; Data Audit
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect, filter, and audit all 548 individual order transactions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportFilteredCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              Download Filtered CSV ({filteredOrders.length})
            </button>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Filter Selects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* Region */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Region
            </label>
            <select
              value={regionFilter}
              onChange={(e) => {
                setRegionFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === 'All' ? 'All Regions' : `${r} Region`}
                </option>
              ))}
            </select>
          </div>

          {/* Quarter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Quarter
            </label>
            <select
              value={quarterFilter}
              onChange={(e) => {
                setQuarterFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              {quarters.map((q) => (
                <option key={q} value={q}>
                  {q === 'All' ? 'All Quarters' : q}
                </option>
              ))}
            </select>
          </div>

          {/* Channel */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Channel
            </label>
            <select
              value={channelFilter}
              onChange={(e) => {
                setChannelFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              {channels.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Channels' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Product */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Product
            </label>
            <select
              value={productFilter}
              onChange={(e) => {
                setProductFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              {products.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Products' : p}
                </option>
              ))}
            </select>
          </div>

          {/* Sales Rep */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Sales Rep
            </label>
            <select
              value={repFilter}
              onChange={(e) => {
                setRepFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              {reps.map((rep) => (
                <option key={rep} value={rep}>
                  {rep === 'All' ? 'All Reps' : rep}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Type */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
              Customer
            </label>
            <select
              value={customerFilter}
              onChange={(e) => {
                setCustomerFilter(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Types</option>
              <option value="New">New</option>
              <option value="Returning">Returning</option>
            </select>
          </div>
        </div>

        {/* Search bar and checkbox */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order ID, rep, or product..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none self-start sm:self-auto">
            <input
              type="checkbox"
              checked={highDiscountOnly}
              onChange={(e) => {
                setHighDiscountOnly(e.target.checked);
                setPage(1);
              }}
              className="rounded text-slate-900 accent-slate-900 focus:ring-0"
            />
            <span className="font-medium text-purple-700">
              Show High Discounts (≥15%) only
            </span>
          </label>
        </div>

        {/* Aggregate KPI Strip for filtered records */}
        <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs">
          <div className="text-slate-600">
            Matching Orders: <strong className="text-slate-900">{filteredOrders.length}</strong>
          </div>
          <div className="text-slate-600">
            Total Revenue:{' '}
            <strong className="text-slate-900 font-mono">{formatCurrency(filteredRevenue)}</strong>
          </div>
          <div className="text-slate-600">
            Units Sold: <strong className="text-slate-900 font-mono">{filteredUnits}</strong>
          </div>
          <div className="text-slate-600">
            Avg Discount:{' '}
            <strong className="text-purple-700 font-mono">{avgDiscount.toFixed(2)}%</strong>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th
                  onClick={() => handleSort('order_id')}
                  className="px-4 py-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    Order ID
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('order_date')}
                  className="px-4 py-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Quarter</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Sales Rep</th>
                <th
                  onClick={() => handleSort('units')}
                  className="px-4 py-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    Units
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Unit Price</th>
                <th
                  onClick={() => handleSort('discount_pct')}
                  className="px-4 py-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    Disc %
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('revenue')}
                  className="px-4 py-3 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center justify-end gap-1">
                    Revenue
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-slate-500 font-sans">
                    No orders match your filter criteria. Try resetting filters.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const isHighDisc = order.discount_pct >= 15;
                  return (
                    <tr
                      key={order.order_id}
                      className={`hover:bg-slate-50 ${isHighDisc ? 'bg-purple-50/30' : ''}`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {order.order_id}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{order.order_date}</td>
                      <td className="px-4 py-3 text-slate-600">{order.quarter}</td>
                      <td className="px-4 py-3 font-sans text-slate-800">{order.region}</td>
                      <td className="px-4 py-3 font-sans text-slate-800">{order.channel}</td>
                      <td className="px-4 py-3 font-sans font-medium text-slate-900">
                        {order.product}
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-700">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                            order.customer_type === 'New'
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {order.customer_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-700">{order.sales_rep}</td>
                      <td className="px-4 py-3 text-right text-slate-900 font-medium">
                        {order.units}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {formatCurrency(order.unit_price)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          isHighDisc
                            ? 'text-rose-600 font-bold'
                            : order.discount_pct > 0
                            ? 'text-amber-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {order.discount_pct}%
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {formatCurrency(order.revenue)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing{' '}
            <strong className="text-slate-900">
              {filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1}
            </strong>{' '}
            to{' '}
            <strong className="text-slate-900">
              {Math.min(page * pageSize, filteredOrders.length)}
            </strong>{' '}
            of <strong className="text-slate-900">{filteredOrders.length}</strong> transactions
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="text-xs border border-slate-200 rounded px-1.5 py-1 bg-white"
            >
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-slate-700 px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
