import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/day?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const day = await prisma.day.findUnique({ where: { date } });

  if (!day) {
    return NextResponse.json({
      date,
      tasks: {},
      habit: null,
      triggers: [],
      habitNote: "",
      note: "",
    });
  }

  // ✅ Parse JSON strings to objects
  return NextResponse.json({
    date: day.date,
    tasks: JSON.parse(day.tasks || "{}"),
    habit: day.habit,
    triggers: JSON.parse(day.triggers || "[]"),
    habitNote: day.habitNote || "",
    note: day.note || "",
  });
}

// POST /api/day  { date, tasks, habit, triggers, habitNote, note }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { date, tasks, habit, triggers, habitNote, note } = body;

  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  // ✅ Convert objects to JSON strings
  const day = await prisma.day.upsert({
    where: { date },
    update: {
      tasks: JSON.stringify(tasks ?? {}),
      habit: habit ?? null,
      triggers: JSON.stringify(triggers ?? []),
      habitNote: habitNote ?? "",
      note: note ?? "",
    },
    create: {
      date,
      tasks: JSON.stringify(tasks ?? {}),
      habit: habit ?? null,
      triggers: JSON.stringify(triggers ?? []),
      habitNote: habitNote ?? "",
      note: note ?? "",
    },
  });

  // ✅ Return parsed data
  return NextResponse.json({
    date: day.date,
    tasks: JSON.parse(day.tasks || "{}"),
    habit: day.habit,
    triggers: JSON.parse(day.triggers || "[]"),
    habitNote: day.habitNote || "",
    note: day.note || "",
  });
}
