# System Architecture & Overview

The West Region Sales Performance & Diagnostic Dashboard is an executive decision-support application designed to analyze, diagnose, and remediate the recent revenue contraction observed in the West sales territory between Q2 and Q3 2026. Built for commercial leaders and regional sales directors, the platform reconciles underlying transactional order data into high-impact diagnostic views—including variance waterfalls, channel and sales representative drill-downs, customer acquisition trends, and cross-regional performance benchmarks. Beyond historical reporting, the application incorporates a predictive turnaround scenario simulator that models the financial impact of strategic interventions—such as discount floor governance, wholesale partner realignments, and multi-product promotional bundling—empowering leadership to formulate data-driven recovery initiatives.

## File Inventory & Responsibilities

| File Path | Description |
| :--- | :--- |
| `ARCHITECTURE.md` | Architectural documentation providing executive context and a comprehensive file-by-file system breakdown for business readers. |
| `.env.example` | Template outlining required and optional environment variable definitions for deployment and external integrations. |
| `.gitignore` | Version control directive designating build artifacts, dependencies, and temporary files excluded from source tracking. |
| `index.html` | Entry-point HTML document establishing page metadata, OpenGraph tags, responsive viewports, and the application DOM mount root. |
| `metadata.json` | Application specification defining platform identification, feature capabilities, and runtime permissions. |
| `package.json` | Project manifest declaring core runtime packages, developer dependencies, and automated build and execution scripts. |
| `tsconfig.json` | TypeScript compiler configuration enforcing type safety standards, modern module resolutions, and directory path aliasing. |
| `vite.config.ts` | Development and production bundler configuration integrating the React framework, Tailwind CSS processing, and network host bindings. |
| `public/assets/aistudio/Lab_1_-_Regional_Sales_de1de499.csv` | Primary commercial dataset containing normalized transactional sales records across all territories, product categories, and sales channels. |
| `src/main.tsx` | Client application entry file responsible for initializing the React runtime and rendering the application into the root container. |
| `src/index.css` | Global styling stylesheet establishing Tailwind CSS design utilities and base typography across the user interface. |
| `src/App.tsx` | Top-level application container coordinating primary navigation tabs, global state, executive memo modals, and raw CSV data downloads. |
| `src/data/salesData.ts` | Centralized data access module defining commercial TypeScript interfaces, dataset constants, and pre-calculated baseline order records. |
| `src/utils/analytics.ts` | Core computational analytics engine executing mathematical reconciliations, regional aggregations, price-volume decompositions, and trend variances. |
| `src/components/Header.tsx` | Primary navigation bar presenting the corporate identity, active view switchers, executive briefing triggers, and export actions. |
| `src/components/ExecutiveSummary.tsx` | Strategic executive briefing dashboard highlighting primary KPI scorecards, quarterly performance trajectories, and high-level root-cause summaries. |
| `src/components/WaterfallBridge.tsx` | Interactive financial waterfall chart visualizing step-by-step revenue variances attributable to sales channels, product mix, and discounting shifts. |
| `src/components/DeepDiveDrivers.tsx` | Diagnostic analytics module dissecting specific operational headwinds, including account rep productivity, customer acquisition freezes, and margin erosion. |
| `src/components/TurnaroundSimulator.tsx` | Strategic forecasting tool that models projected revenue recovery outcomes under variable pricing governance, partner recuperation, and bundle initiatives. |
| `src/components/RegionalBenchmarking.tsx` | Cross-territory comparative view evaluating West performance against North, South, and East benchmarks in revenue, margin discipline, and customer retention. |
| `src/components/OrdersExplorer.tsx` | Operational data grid enabling interactive filtering, sorting, multi-attribute search, and line-item inspection of individual sales orders. |
| `src/components/ExecutiveMemoModal.tsx` | Modal dialog displaying a formatted executive briefing memorandum ready for leadership review, clipboard copying, and print distribution. |
