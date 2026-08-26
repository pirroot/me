export type Task = {
  id: string;
  title: string;
  meta: string;
  prio: 1 | 2 | 3 | 4;
};

export const TASKS: Task[] = [
  { id: "deepwork", title: "Work on Project", meta: "Min 45 min · Ideal 2 hrs", prio: 1 },
  { id: "linkedin", title: "Work on LinkedIn", meta: "1 post/comment/DM with purpose", prio: 2 },
  { id: "body", title: "Body Building", meta: "Min 20 min · Ideal 45 min", prio: 2 },
  { id: "book", title: "Learning", meta: "10 pages or 1 technical article", prio: 3 },
  { id: "money", title: "Thinking 'How can I increase my income?'", meta: "Proposal, profile, pricing", prio: 3 },
  { id: "english", title: "Learn English", meta: "Min 10 min", prio: 4 },
  { id: "phone", title: "Control My Phone", meta: "No mindless scrolling after 22:30", prio: 4 },
  { id: "sleep", title: "Sleep Good.", meta: "Min 7 hrs, consistent schedule", prio: 1 },
];

export const TRIGGERS = ["Fatigue", "Stress", "Idleness", "Late night", "After phone", "Loneliness", "Other"];

export function fmtDate(d: Date): string {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function todayStr(): string {
  return fmtDate(new Date());
}

export function dateAdd(dateStr: string, delta: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + delta);
  return fmtDate(d);
}

export function toFaDigits(n: number | string): string {
  return String(n).replace(/\d/g, (c) => c);
}
