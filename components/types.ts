export type MilestoneStatus = "done" | "in_progress" | "upcoming";

export interface Milestone {
  date: string;
  title: string;
  status: MilestoneStatus;
  source?: string;
}

export interface Company {
  ticker: string;
  name: string;
  project: string;
  state: string;
  metals: string[];
  stage: string;
  progress: number;
  summary: string;
  milestones: Milestone[];
}

export interface Faq {
  q: string;
  a: string;
}

export function formatDate(d: string): string {
  const [y, m, day] = d.split("-").map(Number);
  const month = new Date(Date.UTC(y, (m ?? 1) - 1, 1)).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  return day ? `${month} ${day}, ${y}` : `${month} ${y}`;
}

export const statusMeta: Record<MilestoneStatus, { label: string; dot: string; text: string }> = {
  done: { label: "Completed", dot: "bg-emerald-400", text: "text-emerald-300" },
  in_progress: { label: "In progress", dot: "bg-sky-400 animate-pulse", text: "text-sky-300" },
  upcoming: { label: "Upcoming", dot: "bg-gold-400", text: "text-gold-400" },
};
