/*
  Warnings:

  - You are about to drop the column `ip` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lastActiveDate` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `expires_in` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_ip` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "ip",
DROP COLUMN "lastActiveDate",
DROP COLUMN "refreshToken",
DROP COLUMN "title",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_agent" VARCHAR NOT NULL,
ADD COLUMN     "user_ip" VARCHAR NOT NULL;
