import data from "@/data/portfolio.json";
import CompanyCard from "@/components/CompanyCard";
import { Company, Faq, formatDate } from "@/components/types";

const companies = data.companies as Company[];
const faq = data.faq as Faq[];

const allMilestones = companies.flatMap((c) => c.milestones.map((m) => ({ ...m, ticker: c.ticker })));
const latest = allMilestones
  .filter((m) => m.status !== "upcoming")
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 6);
const upcoming = allMilestones.filter((m) => m.status === "upcoming");
const states = new Set(companies.map((c) => c.state));

const stats: [number, string][] = [
  [companies.length, "Companies"],
  [states.size, "States"],
  [allMilestones.filter((m) => m.status === "done").length, "Completed milestones"],
  [upcoming.length, "Upcoming milestones"],
];

export default function Home() {
  return (
    <>
      <div className="h-1 bg-brand" />
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-900">
            Portfolio <span className="text-brand">Progress</span>
          </p>
          <p className="text-xs text-gray-500">Updated {formatDate(data.updatedAt)}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            U.S. Critical Mineral Projects
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Development milestones across the portfolio, in one place: what has been completed, what is underway and
            what comes next.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-2 border border-gray-200 sm:grid-cols-4">
          {stats.map(([n, label], i) => (
            <div
              key={label}
              className={`p-5 ${i % 2 === 1 ? "border-l border-gray-200" : ""} ${i >= 2 ? "border-t border-gray-200 sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
            >
              <p className="text-3xl font-bold text-gray-900">{n}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">{label}</p>
            </div>
          ))}
        </section>

        {upcoming.length > 0 && (
          <section className="mt-4 border border-brand/30 bg-brand-soft px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">Upcoming</p>
            <ul className="mt-1 space-y-0.5 text-sm text-gray-800">
              {upcoming.map((m) => (
                <li key={m.ticker + m.title}>
                  <span className="font-semibold">{m.ticker}</span> · {m.title}{" "}
                  <span className="text-gray-500">({formatDate(m.date)})</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <section className="min-w-0 lg:col-span-2">
            <h2 className="mb-4 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
              Companies
            </h2>
            <div className="grid gap-4">
              {companies.map((c) => (
                <CompanyCard key={c.ticker} company={c} />
              ))}
            </div>
          </section>

          <aside className="min-w-0 space-y-10">
            <section>
              <h2 className="mb-2 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                Latest updates
              </h2>
              <ul className="divide-y divide-gray-200">
                {latest.map((m) => (
                  <li key={m.ticker + m.title} className="py-3">
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold text-brand">{m.ticker}</span> · {formatDate(m.date)}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-900">{m.title}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-2 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                Investor FAQ
              </h2>
              <div className="divide-y divide-gray-200">
                {faq.map((f) => (
                  <details key={f.q} className="group py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-medium text-gray-900">
                      {f.q}
                      <span className="text-lg leading-none text-brand transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-gray-500 sm:px-6">
          Information is summarized from public company announcements and may be incomplete. This page is for
          informational purposes only and is not investment advice.
        </div>
      </footer>
    </>
  );
}
