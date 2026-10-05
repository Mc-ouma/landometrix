import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-page relative overflow-hidden">
      {/* Signature data-grid dot texture */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <Logo iconOnly size="lg" className="text-brand" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          HTTP 404 • Null Pointer Exception
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-heading tracking-tight mb-4 font-[family-name:var(--font-space-grotesk)]">
          Data point not found in dataset
        </h1>

        <p className="text-base sm:text-lg text-fg-secondary max-w-lg mb-8 leading-relaxed">
          The route you requested appears to have dropped out of our query pipeline.
          Don&apos;t worry — your data is safe and our systems are still operating at 99.9% SLA.
        </p>

        {/* Mock Telemetry snippet */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs text-left max-w-md w-full mb-8 border border-slate-800 shadow-inner">
          <div className="text-slate-500 mb-1">{"// Telemetry log trace"}</div>
          <div><span className="text-emerald-400">STATUS:</span> 404_NOT_FOUND</div>
          <div><span className="text-sky-400">LATENCY:</span> 12ms</div>
          <div><span className="text-amber-400">DIAGNOSIS:</span> The URL may have moved or been retired.</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="btn-primary text-sm px-6 py-3 shadow-md"
          >
            Return to Clean Data (Home)
          </Link>
          <Link
            href="/services"
            className="tap-target inline-flex items-center justify-center px-6 py-3 rounded-xl border border-line-strong bg-surface text-fg hover:border-line-highlight font-semibold text-sm transition-all shadow-sm"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}
