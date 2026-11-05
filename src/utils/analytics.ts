import { OrderRecord } from '../data/salesData';

export interface RegionalSummary {
  region: string;
  q1Revenue: number;
  q2Revenue: number;
  q3Revenue: number;
  totalRevenue: number;
  q3VsQ2Delta: number;
  q3VsQ2Pct: number;
  q1Units: number;
  q2Units: number;
  q3Units: number;
}

export interface ProductDelta {
  product: string;
  q2Revenue: number;
  q3Revenue: number;
  deltaRevenue: number;
  pctChange: number;
  q2Units: number;
  q3Units: number;
  deltaUnits: number;
  avgPrice: number;
}

export interface ChannelDelta {
  channel: string;
  q2Revenue: number;
  q3Revenue: number;
  deltaRevenue: number;
  pctChange: number;
  q2Orders: number;
  q3Orders: number;
}

export interface SalesRepDelta {
  rep: string;
  q2Revenue: number;
  q3Revenue: number;
  deltaRevenue: number;
  pctChange: number;
  partnerQ2: number;
  partnerQ3: number;
  retailQ2: number;
  retailQ3: number;
  onlineQ2: number;
  onlineQ3: number;
}

export interface WaterfallStep {
  name: string;
  amount: number;
  type: 'base' | 'negative' | 'positive' | 'total';
  runningTotal: number;
  description: string;
}

export function computeRegionalSummaries(orders: OrderRecord[]): RegionalSummary[] {
  const regions = ['North', 'East', 'South', 'West'] as const;
  return regions.map(reg => {
    const regOrders = orders.filter(o => o.region === reg);
    const q1 = regOrders.filter(o => o.quarter === 'Q1');
    const q2 = regOrders.filter(o => o.quarter === 'Q2');
    const q3 = regOrders.filter(o => o.quarter === 'Q3');

    const q1Rev = q1.reduce((s, o) => s + o.revenue, 0);
    const q2Rev = q2.reduce((s, o) => s + o.revenue, 0);
    const q3Rev = q3.reduce((s, o) => s + o.revenue, 0);
    const delta = q3Rev - q2Rev;
    const pct = q2Rev > 0 ? (delta / q2Rev) * 100 : 0;

    return {
      region: reg,
      q1Revenue: q1Rev,
      q2Revenue: q2Rev,
      q3Revenue: q3Rev,
      totalRevenue: q1Rev + q2Rev + q3Rev,
      q3VsQ2Delta: delta,
      q3VsQ2Pct: pct,
      q1Units: q1.reduce((s, o) => s + o.units, 0),
      q2Units: q2.reduce((s, o) => s + o.units, 0),
      q3Units: q3.reduce((s, o) => s + o.units, 0),
    };
  });
}

export function computeWestProductDeltas(orders: OrderRecord[]): ProductDelta[] {
  const westOrders = orders.filter(o => o.region === 'West');
  const products = ['Air Fryer XL', 'Pro Blender', 'Smart Kettle', 'Espresso Mini', 'Knife Set'] as const;

  return products.map(prod => {
    const q2 = westOrders.filter(o => o.quarter === 'Q2' && o.product === prod);
    const q3 = westOrders.filter(o => o.quarter === 'Q3' && o.product === prod);

    const q2Rev = q2.reduce((s, o) => s + o.revenue, 0);
    const q3Rev = q3.reduce((s, o) => s + o.revenue, 0);
    const q2Units = q2.reduce((s, o) => s + o.units, 0);
    const q3Units = q3.reduce((s, o) => s + o.units, 0);
    const deltaRev = q3Rev - q2Rev;
    const pct = q2Rev > 0 ? (deltaRev / q2Rev) * 100 : 0;

    const allProd = westOrders.filter(o => o.product === prod);
    const avgPrice = allProd.length > 0 ? allProd[0].unit_price : 0;

    return {
      product: prod,
      q2Revenue: q2Rev,
      q3Revenue: q3Rev,
      deltaRevenue: deltaRev,
      pctChange: pct,
      q2Units,
      q3Units,
      deltaUnits: q3Units - q2Units,
      avgPrice,
    };
  }).sort((a, b) => a.deltaRevenue - b.deltaRevenue); // Most negative first
}

export function computeWestChannelDeltas(orders: OrderRecord[]): ChannelDelta[] {
  const westOrders = orders.filter(o => o.region === 'West');
  const channels = ['Partner', 'Retail', 'Online'] as const;

  return channels.map(ch => {
    const q2 = westOrders.filter(o => o.quarter === 'Q2' && o.channel === ch);
    const q3 = westOrders.filter(o => o.quarter === 'Q3' && o.channel === ch);

    const q2Rev = q2.reduce((s, o) => s + o.revenue, 0);
    const q3Rev = q3.reduce((s, o) => s + o.revenue, 0);
    const deltaRev = q3Rev - q2Rev;
    const pct = q2Rev > 0 ? (deltaRev / q2Rev) * 100 : 0;

    return {
      channel: ch,
      q2Revenue: q2Rev,
      q3Revenue: q3Rev,
      deltaRevenue: deltaRev,
      pctChange: pct,
      q2Orders: q2.length,
      q3Orders: q3.length,
    };
  }).sort((a, b) => a.deltaRevenue - b.deltaRevenue);
}

export function computeWestRepDeltas(orders: OrderRecord[]): SalesRepDelta[] {
  const westOrders = orders.filter(o => o.region === 'West');
  const reps = ['T. Nguyen', 'J. Ortiz'];

  return reps.map(rep => {
    const q2 = westOrders.filter(o => o.quarter === 'Q2' && o.sales_rep === rep);
    const q3 = westOrders.filter(o => o.quarter === 'Q3' && o.sales_rep === rep);

    const q2Rev = q2.reduce((s, o) => s + o.revenue, 0);
    const q3Rev = q3.reduce((s, o) => s + o.revenue, 0);
    const deltaRev = q3Rev - q2Rev;
    const pct = q2Rev > 0 ? (deltaRev / q2Rev) * 100 : 0;

    return {
      rep,
      q2Revenue: q2Rev,
      q3Revenue: q3Rev,
      deltaRevenue: deltaRev,
      pctChange: pct,
      partnerQ2: q2.filter(o => o.channel === 'Partner').reduce((s, o) => s + o.revenue, 0),
      partnerQ3: q3.filter(o => o.channel === 'Partner').reduce((s, o) => s + o.revenue, 0),
      retailQ2: q2.filter(o => o.channel === 'Retail').reduce((s, o) => s + o.revenue, 0),
      retailQ3: q3.filter(o => o.channel === 'Retail').reduce((s, o) => s + o.revenue, 0),
      onlineQ2: q2.filter(o => o.channel === 'Online').reduce((s, o) => s + o.revenue, 0),
      onlineQ3: q3.filter(o => o.channel === 'Online').reduce((s, o) => s + o.revenue, 0),
    };
  });
}

export function computeWestWaterfall(orders: OrderRecord[]): WaterfallStep[] {
  const productDeltas = computeWestProductDeltas(orders);
  const westOrders = orders.filter(o => o.region === 'West');
  const q2Rev = westOrders.filter(o => o.quarter === 'Q2').reduce((s, o) => s + o.revenue, 0);
  const q3Rev = westOrders.filter(o => o.quarter === 'Q3').reduce((s, o) => s + o.revenue, 0);

  const steps: WaterfallStep[] = [];
  let running = q2Rev;

  steps.push({
    name: 'Q2 West Revenue',
    amount: q2Rev,
    type: 'base',
    runningTotal: running,
    description: 'Starting baseline revenue for West region in Q2 2026',
  });

  // Sort: negative items first, then positive
  const sortedDeltas = [...productDeltas].sort((a, b) => a.deltaRevenue - b.deltaRevenue);

  sortedDeltas.forEach(p => {
    running += p.deltaRevenue;
    steps.push({
      name: p.product,
      amount: p.deltaRevenue,
      type: p.deltaRevenue < 0 ? 'negative' : 'positive',
      runningTotal: running,
      description: `${p.deltaRevenue < 0 ? 'Lost' : 'Gained'} ${Math.abs(p.deltaUnits)} units (${p.pctChange.toFixed(1)}%)`,
    });
  });

  steps.push({
    name: 'Q3 West Revenue',
    amount: q3Rev,
    type: 'total',
    runningTotal: q3Rev,
    description: 'Final closed Q3 2026 revenue for West region',
  });

  return steps;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(pct: number): string {
  const prefix = pct > 0 ? '+' : '';
  return `${prefix}${pct.toFixed(2)}%`;
}
