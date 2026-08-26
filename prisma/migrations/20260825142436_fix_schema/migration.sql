/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trigger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Task_dayId_idx";

-- DropIndex
DROP INDEX "Trigger_dayId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Task";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trigger";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "tasks" TEXT NOT NULL DEFAULT '{}',
    "habit" TEXT,
    "triggers" TEXT NOT NULL DEFAULT '[]',
    "habitNote" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Day" ("createdAt", "date", "habit", "habitNote", "id", "note", "updatedAt") SELECT "createdAt", "date", "habit", "habitNote", "id", "note", "updatedAt" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
