/*
  Warnings:

  - A unique constraint covering the columns `[user_agent]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "user_agent" SET DATA TYPE TEXT,
ALTER COLUMN "user_ip" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_agent_key" ON "sessions"("user_agent");
