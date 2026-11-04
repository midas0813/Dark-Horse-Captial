"use client";

import { useState } from "react";
import { Company, formatDate, statusMeta } from "./types";

export default function CompanyCard({ company }: { company: Company }) {
  const hasTimeline = company.milestones.length > 0;
  const [open, setOpen] = useState(company.ticker === "SDRC");
  const done = company.milestones.filter((m) => m.status === "done").length;
  const next = company.milestones.find((m) => m.status !== "done");

  return (
    <article
      className={`min-w-0 rounded-2xl border bg-navy-900/80 p-5 transition sm:p-6 ${
        hasTimeline ? "border-navy-700 hover:border-gold-500/50" : "border-dashed border-navy-700/70 opacity-75"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-gold-500/15 px-2 py-0.5 font-mono text-sm font-semibold text-gold-400">
              {company.ticker}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400">{company.state}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">{company.name}</h3>
          <p className="text-sm text-slate-400">{company.project}</p>
        </div>
        <span className="rounded-full border border-navy-700 px-3 py-1 text-xs text-slate-300">
          {company.stage}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {company.metals.map((m) => (
          <span key={m} className="rounded-full bg-navy-800 px-2.5 py-0.5 text-xs text-slate-300">
            {m}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-slate-400">
          <span>Exploration</span>
          <span>Development</span>
          <span>Production</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-navy-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
            style={{ width: `${company.progress}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300">{company.summary}</p>

      {hasTimeline ? (
        <>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
            <span>
              <strong className="text-white">{done}</strong> milestones completed
            </span>
            {next && (
              <span>
                Next: <strong className="text-gold-400">{next.title}</strong>
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-4 text-sm font-medium text-gold-400 hover:text-gold-500"
          >
            {open ? "Hide timeline ↑" : "View timeline ↓"}
          </button>
          {open && (
            <ol className="relative mt-4 space-y-4 border-l border-navy-700 pl-5">
              {[...company.milestones].reverse().map((m) => {
                const s = statusMeta[m.status];
                return (
                  <li key={m.date + m.title} className="relative">
                    <span className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-navy-900 ${s.dot}`} />
                    <div className="flex flex-wrap items-center gap-x-2 text-xs">
                      <time className="text-slate-400">{formatDate(m.date)}</time>
                      <span className={s.text}>· {s.label}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-white">{m.title}</p>
                    {m.source && <p className="mt-0.5 text-xs text-slate-500">Source: {m.source}</p>}
                  </li>
                );
              })}
            </ol>
          )}
        </>
      ) : (
        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">Timeline coming soon</p>
      )}
    </article>
  );
}
