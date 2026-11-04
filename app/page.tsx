import data from "@/data/portfolio.json";
import CompanyCard from "@/components/CompanyCard";
import { Company, Faq, formatDate, statusMeta } from "@/components/types";

const companies = data.companies as Company[];
const faq = data.faq as Faq[];

const allMilestones = companies.flatMap((c) => c.milestones.map((m) => ({ ...m, ticker: c.ticker })));
const latest = allMilestones
  .filter((m) => m.status !== "upcoming")
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 6);
const upcoming = allMilestones.filter((m) => m.status === "upcoming");
const states = new Set(companies.map((c) => c.state));

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Concept demo</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Portfolio Progress</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Milestones across U.S. critical mineral projects, in one place. Progress that the daily share price
          doesn&apos;t always show.
        </p>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          [companies.length, "Companies"],
          [states.size, "States"],
          [allMilestones.filter((m) => m.status === "done").length, "Milestones completed"],
          [upcoming.length, "Upcoming catalysts"],
        ].map(([n, label]) => (
          <div key={label} className="rounded-xl border border-navy-700 bg-navy-900/70 p-4">
            <p className="text-2xl font-bold text-white">{n}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </section>

      {upcoming.length > 0 && (
        <section className="mt-4 rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-sm">
          <span className="font-semibold text-gold-400">Coming up: </span>
          <span className="text-slate-200">
            {upcoming.map((m, i) => (
              <span key={m.ticker + m.title}>
                {i > 0 && " · "}
                <strong className="text-white">{m.ticker}</strong> {m.title} ({formatDate(m.date)})
              </span>
            ))}
          </span>
        </section>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="min-w-0 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-white">Companies</h2>
          <div className="grid gap-4">
            {companies.map((c) => (
              <CompanyCard key={c.ticker} company={c} />
            ))}
          </div>
        </section>

        <aside className="min-w-0 space-y-8">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Latest updates</h2>
            <ul className="space-y-3">
              {latest.map((m) => (
                <li key={m.ticker + m.title} className="rounded-xl border border-navy-700 bg-navy-900/70 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-gold-400">{m.ticker}</span>
                    <time className="text-slate-400">{formatDate(m.date)}</time>
                  </div>
                  <p className="mt-1 text-sm text-white">{m.title}</p>
                  <p className={`mt-1 text-xs ${statusMeta[m.status].text}`}>{statusMeta[m.status].label}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Investor FAQ</h2>
            <div className="space-y-2">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-navy-700 bg-navy-900/70 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-white">
                    {f.q}
                    <span className="text-gold-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <footer className="mt-14 border-t border-navy-800 pt-6 text-xs leading-relaxed text-slate-500">
        <p>
          Concept demo – not affiliated with any company. Information summarized from public announcements; may be
          incomplete. Not investment advice. Last updated {formatDate(data.updatedAt)}.
        </p>
      </footer>
    </main>
  );
}
