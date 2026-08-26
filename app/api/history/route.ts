import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TASKS, dateAdd, todayStr } from "@/lib/tasks";

// GET /api/history?days=35
export async function GET(req: NextRequest) {
  const windowSize = Number(req.nextUrl.searchParams.get("days") ?? 35);
  const today = todayStr();

  // ساخت لیست تاریخ‌های مورد نظر
  const dates: string[] = [];
  for (let i = windowSize - 1; i >= 0; i--) {
    dates.push(dateAdd(today, -i));
  }

  // دریافت رکوردهای پنجره
  const windowRecords = await prisma.day.findMany({
    where: { date: { in: dates } },
  });
  const windowMap = new Map(windowRecords.map((r) => [r.date, r]));

  // ✅ Parse JSON strings to objects
  const days = dates.map((d) => {
    const rec = windowMap.get(d);
    return {
      date: d,
      tasks: rec?.tasks ? JSON.parse(rec.tasks) : {},
      habit: rec?.habit ?? null,
    };
  });

  // دریافت تمام رکوردها برای محاسبه Streak
  const allRecords = await prisma.day.findMany({
    orderBy: { date: "asc" },
  });
  const allMap = new Map(allRecords.map((r) => [r.date, r]));

  // محاسبه Current Streak
  let currentStreak = 0;
  let cursor = today;
  let checkedToday = false;

  while (true) {
    const rec = allMap.get(cursor);

    if (!rec) {
      if (!checkedToday && cursor === today) {
        cursor = dateAdd(cursor, -1);
        checkedToday = true;
        continue;
      }
      break;
    }

    if (rec.habit === "clean") {
      currentStreak++;
      cursor = dateAdd(cursor, -1);
      checkedToday = true;
    } else if (rec.habit === "slip") {
      break;
    } else {
      // habit === null (ثبت نشده)
      if (!checkedToday && cursor === today) {
        cursor = dateAdd(cursor, -1);
        checkedToday = true;
        continue;
      }
      break;
    }
  }

  // محاسبه Longest Streak
  let longestStreak = 0;
  let running = 0;
  let prevDate: string | null = null;

  for (const rec of allRecords) {
    if (rec.habit === "clean") {
      if (prevDate && dateAdd(prevDate, 1) === rec.date) {
        running++;
      } else {
        running = 1;
      }
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
    prevDate = rec.date;
  }

  // محاسبه نرخ تکمیل تسک‌ها در ۷ روز اخیر
  const lastWeek = days.slice(-7);
  let possible = 0;
  let done = 0;

  for (const d of lastWeek) {
    for (const t of TASKS) {
      possible++;
      if (d.tasks[t.id]) done++;
    }
  }
  const weekRate = possible ? Math.round((done / possible) * 100) : 0;

  return NextResponse.json({
    days,
    currentStreak,
    longestStreak,
    weekRate,
  });
}
