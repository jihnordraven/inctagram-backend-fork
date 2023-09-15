/*
  Warnings:

  - You are about to drop the column `picture` on the `google_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "google_profiles" DROP COLUMN "picture",
ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "github_profiles" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "github_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_id_key" ON "github_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_provider_id_key" ON "github_profiles"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_email_key" ON "github_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_user_id_key" ON "github_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "github_profiles" ADD CONSTRAINT "github_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
