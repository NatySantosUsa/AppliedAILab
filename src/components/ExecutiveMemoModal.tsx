import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';

interface ExecutiveMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveMemoModal: React.FC<ExecutiveMemoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const memoText = `MEMORANDUM

TO: Executive Leadership & Regional Sales Directors
FROM: Senior Sales Analytics Lead
DATE: October 2026
SUBJECT: West Region Q3 Revenue Diagnostic & Turnaround Directives

1. EXECUTIVE SUMMARY: BY HOW MUCH DID WEST REVENUE FALL?
In Q3 2026, West region revenue dropped by -$2,522.05 (-12.18%) compared to Q2:
• Q2 2026 West Revenue: $20,709.75 (138 units, 46 orders, 3.37% avg discount)
• Q3 2026 West Revenue: $18,187.70 (126 units, 46 orders, 6.63% avg discount)
• Quarter-over-Quarter Variance: -$2,522.05 (-12.18%)
• Peak-to-Trough Variance (vs Q1 $22,055.40): -$3,867.70 (-17.53%)
• Regional Standing: West fell from the #2 position in Q1 to #4 (last place) in Q3, while the South grew (+5.8%) and North held flat (-0.2%).

2. ROOT CAUSE ANALYSIS: THE NUMBERS BEHIND THE DECLINE
Decomposition of the -$2,522.05 deficit reveals four interconnected failure points:

A. Partner Wholesale Channel Collapse (-$1,970.55 / -20.5%)
• Partner revenue collapsed from $9,594.95 to $7,624.40, representing 78.1% of the entire regional deficit.
• Specifically, sales rep T. Nguyen experienced a -$5,316.50 (-72.4%) wipeout in partner accounts (falling from $7,341.80 to $2,025.30). While J. Ortiz picked up +$3,345.95 in partner sales, it was insufficient to offset Nguyen's losses.

B. Product Mix Shift Away From Premium Cooking Appliances (-$4,539.80 combined loss)
• Air Fryer XL ($149 list): Revenue plummeted -$2,942.75 (-60.6%), with units falling from 34 to 14.
• Pro Blender ($189 list): Revenue fell -$1,597.05 (-27.0%), down from $5,915.70 to $4,318.65.
• Smart Kettle ($79 list): Revenue dipped -$940.10 (-35.4%), from 35 units down to 22 units.
• Offset: Knife Set surged +$2,790.55 (+224%, 35 units vs 11), but its lower price point ($119) could not make up for losing 20 Air Fryer units and 4 Pro Blender units.

C. Freeze in New Customer Acquisition (-$3,880.40 / -44.1%)
• Revenue from New Customers fell by -$3,880.40 (from $8,803.50 in Q2 down to $4,923.10 in Q3).
• Returning customer revenue grew slightly (+$1,358.35), demonstrating that existing accounts remained loyal while new account generation completely stalled.

D. Uncontrolled Pro Blender Discounting (+3.26 percentage point discount spike)
• West average discount rate jumped from 3.37% in Q2 to 6.63% in Q3.
• Sales reps offered 15%, 20%, and 25% discounts across 10 Pro Blender transactions in Q3 (concessions never permitted in prior quarters).
• This surrendered +$854.05 in margin leakage without stimulating unit demand (Pro Blender units still fell from 32 to 28).

3. STRATEGIC TURNAROUND PLAN: TWO RECOMMENDED ACTIONS

ACTION 1: Partner Account Recovery & Wholesale Realignment (Target: +$3,500/quarter)
• Immediate 14-Day Wholesale Audit: Conduct account-level reviews with all West commercial partners who paused re-orders in Q3 to resolve stockout, delivery, or distributor friction.
• Joint-Coverage Model: Pair J. Ortiz (who achieved +148% partner growth in Q3) with T. Nguyen to co-manage distressed wholesale relationships.
• Structured Volume Rebates: Replace ad-hoc upfront discounts with quarterly volume thresholds (e.g. 5+ unit commitments receiving a back-end credit).

ACTION 2: Enforce a 10% Price Floor & Launch High-Ticket Promotional Bundles (Target: +$2,800/quarter)
• Strict Discount Governance: Strip representative discretion for discounts above 10% on Pro Blender, immediately clawing back ~$850 in margin leakage.
• "Culinary Station Bundle": Leverage the +224% surge in Knife Sets by packaging the sluggish Air Fryer XL ($149) or Pro Blender ($189) with the popular Knife Set ($119) at a bundled 10% incentive ($241.20 bundle price).
• New Account Acquisition Push: Launch targeted digital and direct sales campaigns offering the bundle to prospective commercial and retail accounts to restart the stalled new customer acquisition engine.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-800" />
            <h3 className="font-bold text-slate-900 text-sm">
              Executive Briefing Memorandum
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  Copy Text
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Memo Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50/30">
          {memoText}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 rounded-b-xl">
          <span>Prepared from verified Lab 1 Regional Sales order data</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
