"use client";

import { useState } from "react";
import { Company, formatDate, statusMeta } from "./types";

const stages = ["Exploration", "Development", "Production"];

export default function CompanyCard({ company }: { company: Company }) {
  const hasTimeline = company.milestones.length > 0;
  const [open, setOpen] = useState(company.ticker === "SDRC");
  const done = company.milestones.filter((m) => m.status === "done").length;
  const next = company.milestones.find((m) => m.status !== "done");

  return (
    <article className="min-w-0 border border-gray-200 bg-white">
      <div className="border-l-4 border-brand p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              <span className="text-brand">{company.ticker}</span> · {company.state}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.project}</p>
          </div>
          <span className="border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700">{company.stage}</span>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          <span className="font-medium text-gray-800">Commodities:</span> {company.metals.join(", ")}
        </p>

        <div className="mt-5">
          <div className="h-1.5 bg-gray-200">
            <div className="h-full bg-brand" style={{ width: `${company.progress}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] uppercase tracking-wider text-gray-500">
            {stages.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">{company.summary}</p>

        {hasTimeline ? (
          <>
            <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div>
                <dt className="inline text-gray-500">Completed milestones: </dt>
                <dd className="inline font-semibold text-gray-900">{done}</dd>
              </div>
              {next && (
                <div>
                  <dt className="inline text-gray-500">Next: </dt>
                  <dd className="inline font-semibold text-gray-900">{next.title}</dd>
                </div>
              )}
            </dl>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="mt-4 text-sm font-semibold text-brand hover:text-brand-dark"
            >
              {open ? "Hide timeline" : "Show timeline"}
            </button>

            {open && (
              <ol className="mt-4 divide-y divide-gray-100 border-t border-gray-200">
                {[...company.milestones].reverse().map((m) => {
                  const s = statusMeta[m.status];
                  return (
                    <li key={m.date + m.title} className="grid gap-1 py-3 sm:grid-cols-[110px_1fr] sm:gap-4">
                      <time className="text-sm text-gray-500">{formatDate(m.date)}</time>
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className={`mr-2 inline-block h-2 w-2 rounded-full align-middle ${s.dot}`} />
                          {m.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          <span className={s.text}>{s.label}</span>
                          {m.source && <> · {m.source}</>}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Milestone timeline will be added shortly.</p>
        )}
      </div>
    </article>
  );
}
