"use client";

import { useState } from "react";

interface DataPoint {
  label: string;
  value: number;
  secondaryValue: number;
  formattedValue: string;
  change: string;
}

interface Dataset {
  id: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  secondaryUnit: string;
  data: DataPoint[];
}

const DATASETS: Dataset[] = [
  {
    id: "agritech",
    name: "Regional Agribusiness Yield",
    category: "Operations & Supply",
    description: "Harvest yield across regional collection hubs in Kenya before vs. after dispatch optimization.",
    unit: "Tons / Week",
    secondaryUnit: "Previous Benchmark",
    data: [
      { label: "Uasin Gishu", value: 340, secondaryValue: 210, formattedValue: "340 T", change: "+61.9%" },
      { label: "Nakuru", value: 520, secondaryValue: 380, formattedValue: "520 T", change: "+36.8%" },
      { label: "Trans Nzoia", value: 460, secondaryValue: 290, formattedValue: "460 T", change: "+58.6%" },
      { label: "Kiambu", value: 280, secondaryValue: 220, formattedValue: "280 T", change: "+27.2%" },
      { label: "Meru", value: 390, secondaryValue: 270, formattedValue: "390 T", change: "+44.4%" },
      { label: "Machakos", value: 210, secondaryValue: 140, formattedValue: "210 T", change: "+50.0%" },
    ],
  },
  {
    id: "fintech",
    name: "Mobile Money Telemetry",
    category: "Financial Technology",
    description: "Peak-hour transaction completion rate across regional gateway integrations.",
    unit: "% Success",
    secondaryUnit: "Target SLA (99%)",
    data: [
      { label: "08:00 AM", value: 99.4, secondaryValue: 97.2, formattedValue: "99.4%", change: "+2.2%" },
      { label: "11:00 AM", value: 98.9, secondaryValue: 94.5, formattedValue: "98.9%", change: "+4.4%" },
      { label: "02:00 PM", value: 99.7, secondaryValue: 95.8, formattedValue: "99.7%", change: "+3.9%" },
      { label: "05:00 PM", value: 99.1, secondaryValue: 92.1, formattedValue: "99.1%", change: "+7.0%" },
      { label: "08:00 PM", value: 99.8, secondaryValue: 96.0, formattedValue: "99.8%", change: "+3.8%" },
      { label: "11:00 PM", value: 99.9, secondaryValue: 98.1, formattedValue: "99.9%", change: "+1.8%" },
    ],
  },
  {
    id: "conversion",
    name: "Web Portal Conversion",
    category: "Product & Digital",
    description: "Visitor to qualified lead conversion trajectory following custom responsive rebuild.",
    unit: "Inquiries / Mo",
    secondaryUnit: "Previous Architecture",
    data: [
      { label: "Month 1", value: 45, secondaryValue: 18, formattedValue: "45 Leads", change: "+150%" },
      { label: "Month 2", value: 72, secondaryValue: 24, formattedValue: "72 Leads", change: "+200%" },
      { label: "Month 3", value: 110, secondaryValue: 29, formattedValue: "110 Leads", change: "+279%" },
      { label: "Month 4", value: 148, secondaryValue: 33, formattedValue: "148 Leads", change: "+348%" },
      { label: "Month 5", value: 195, secondaryValue: 36, formattedValue: "195 Leads", change: "+441%" },
      { label: "Month 6", value: 240, secondaryValue: 40, formattedValue: "240 Leads", change: "+500%" },
    ],
  },
];

type ChartViewType = "trend" | "bar";

export default function DataShowcase() {
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);
  const [chartType, setChartType] = useState<ChartViewType>("trend");
  const [showTableView, setShowTableView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeDataset = DATASETS[selectedDatasetIndex];
  const maxVal = Math.max(...activeDataset.data.map((d) => d.value));

  // Dimensions for SVG rendering
  const width = 640;
  const height = 300;
  const paddingX = 40;
  const paddingY = 40;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  // Compute coordinates for line chart (featuring sharp geometric peak motif echoing the 'M' in the logo)
  const points = activeDataset.data.map((d, i) => {
    const x = paddingX + (i / (activeDataset.data.length - 1)) * graphWidth;
    const y = height - paddingY - (d.value / maxVal) * graphHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  // Area fill under line chart
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="card overflow-hidden shadow-md">
      {/* Top Controller Bar */}
      <div className="p-4 sm:p-6 border-b border-line flex flex-col md:flex-row md:items-center justify-between gap-4 bg-subtle/50">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-blue animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand font-mono">
              Live Showcase
            </span>
          </div>
          <h3 className="text-xl font-bold text-heading mt-1 font-[family-name:var(--font-space-grotesk)]">
            {activeDataset.name}
          </h3>
          <p className="text-xs text-fg-secondary font-medium">
            {activeDataset.description}
          </p>
        </div>

        {/* Dataset Selection Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface rounded-xl border border-line">
          {DATASETS.map((ds, idx) => (
            <button
              key={ds.id}
              onClick={() => {
                setSelectedDatasetIndex(idx);
                setHoveredIndex(null);
              }}
              type="button"
              className={`tap-target px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDatasetIndex === idx
                  ? "bg-primary-blue text-white shadow-xs"
                  : "text-fg-secondary hover:text-heading hover:bg-subtle"
              }`}
            >
              {ds.id === "agritech" ? "AgriTech" : ds.id === "fintech" ? "FinTech SLA" : "Web Growth"}
            </button>
          ))}
        </div>
      </div>

      {/* Control Strip: Chart Type & Accessible Table Toggle */}
      <div className="px-6 py-2.5 border-b border-line flex items-center justify-between text-xs text-fg-muted">
        <div className="flex items-center space-x-2">
          <span>Format:</span>
          <button
            onClick={() => {
              setChartType("trend");
              setShowTableView(false);
            }}
            type="button"
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              !showTableView && chartType === "trend"
                ? "bg-subtle text-brand font-semibold"
                : "hover:text-heading"
            }`}
          >
            M-Peak Trend
          </button>
          <button
            onClick={() => {
              setChartType("bar");
              setShowTableView(false);
            }}
            type="button"
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              !showTableView && chartType === "bar"
                ? "bg-subtle text-brand font-semibold"
                : "hover:text-heading"
            }`}
          >
            Comparison Bar
          </button>
        </div>

        {/* Accessibility Table Toggle Button */}
        <button
          onClick={() => setShowTableView(!showTableView)}
          type="button"
          className="inline-flex items-center text-brand hover:underline font-medium"
          aria-expanded={showTableView}
        >
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {showTableView ? "Switch to Visual Chart" : "Screen Reader Table Alternative"}
        </button>
      </div>

      {/* Main Display Area */}
      <div className="p-4 sm:p-6">
        {showTableView ? (
          /* Accessible Table Alternative (WCAG AA Compliant) */
          <div className="overflow-x-auto rounded-xl border border-line">
            <table
              className="w-full text-left text-sm border-collapse"
              aria-label={`Data table showing ${activeDataset.name}`}
            >
              <thead>
                <tr className="border-b border-line bg-subtle text-heading text-xs">
                  <th scope="col" className="py-3 px-4 font-bold">Location / Timeline</th>
                  <th scope="col" className="py-3 px-4 font-bold text-brand">{activeDataset.unit} (Current)</th>
                  <th scope="col" className="py-3 px-4 font-bold text-fg-muted">{activeDataset.secondaryUnit}</th>
                  <th scope="col" className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {activeDataset.data.map((row) => (
                  <tr key={row.label} className="hover:bg-subtle/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-heading">{row.label}</td>
                    <td className="py-3 px-4 font-mono font-bold text-brand">{row.formattedValue}</td>
                    <td className="py-3 px-4 font-mono text-fg-muted">{row.secondaryValue}</td>
                    <td className="py-3 px-4 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Interactive Animated SVG Chart */
          <div className="relative">
            <div className="w-full aspect-[2/1] sm:aspect-[2.2/1] max-h-[320px]">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full overflow-visible"
                role="img"
                aria-label={`Interactive chart visualizing ${activeDataset.name}`}
              >
                <defs>
                  {/* Gradient for M-Peak Area */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Gradient for Bars */}
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[0.25, 0.5, 0.75, 1].map((pct) => {
                  const y = height - paddingY - pct * graphHeight;
                  return (
                    <line
                      key={pct}
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Baseline Axis */}
                <line
                  x1={paddingX}
                  y1={height - paddingY}
                  x2={width - paddingX}
                  y2={height - paddingY}
                  stroke="currentColor"
                  className="text-slate-300 dark:text-slate-700"
                  strokeWidth="1.5"
                />

                {chartType === "trend" ? (
                  <>
                    {/* Area fill */}
                    <path d={areaD} fill="url(#chartGradient)" />

                    {/* M-Peak Motif Trend Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#1D4ED8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      className="transition-all duration-300 dark:stroke-sky-400"
                    />

                    {/* Peak Nodes echoing the LM Monogram angle */}
                    {points.map((pt, idx) => (
                      <g
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        className="cursor-pointer group"
                      >
                        {/* Outer pulse indicator */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredIndex === idx ? 8 : 4}
                          className="fill-blue-600 dark:fill-sky-400 transition-all duration-200 opacity-90"
                        />
                        {/* Peak Monogram Square motif */}
                        <rect
                          x={pt.x - 3}
                          y={pt.y - 3}
                          width="6"
                          height="6"
                          className="fill-white dark:fill-slate-900 transition-all"
                        />
                        {/* Text Label on X Axis */}
                        <text
                          x={pt.x}
                          y={height - 12}
                          textAnchor="middle"
                          className="text-[11px] font-medium fill-slate-500 dark:fill-slate-400"
                        >
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </>
                ) : (
                  /* Comparative Bar Chart */
                  <>
                    {activeDataset.data.map((d, idx) => {
                      const barWidth = (graphWidth / activeDataset.data.length) * 0.55;
                      const x = paddingX + (idx + 0.22) * (graphWidth / activeDataset.data.length);
                      const barH = (d.value / maxVal) * graphHeight;
                      const y = height - paddingY - barH;
                      const isHovered = hoveredIndex === idx;

                      return (
                        <g
                          key={idx}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          className="cursor-pointer"
                        >
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barH}
                            rx="4"
                            fill="url(#barGradient)"
                            className={`transition-all duration-300 ${
                              isHovered ? "opacity-100 filter brightness-110" : "opacity-90"
                            }`}
                          />
                          <text
                            x={x + barWidth / 2}
                            y={height - 12}
                            textAnchor="middle"
                            className="text-[11px] font-medium fill-slate-500 dark:fill-slate-400"
                          >
                            {d.label}
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>

            {/* Hover Tooltip Card */}
            {hoveredIndex !== null && (
              <div className="absolute top-2 right-4 bg-slate-900/95 dark:bg-slate-800/95 text-white p-3 rounded-lg shadow-lg border border-slate-700 pointer-events-none text-xs backdrop-blur-sm animate-fade-in">
                <div className="font-semibold text-slate-300">
                  {activeDataset.data[hoveredIndex].label}
                </div>
                <div className="text-base font-extrabold text-sky-300 font-mono mt-0.5">
                  {activeDataset.data[hoveredIndex].formattedValue}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  {activeDataset.data[hoveredIndex].change} vs baseline
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Narrative Note */}
        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs text-fg-muted">
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-brand font-bold">LM Motif:</span>
            <span>M-peak geometry reflects the Landometrix LM monogram in visual trendlines.</span>
          </div>
          <span className="font-mono text-[11px] text-fg-muted">Pure React SVG • 0KB external charting runtime</span>
        </div>
      </div>
    </div>
  );
}
