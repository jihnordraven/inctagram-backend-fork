-- CreateTable
CREATE TABLE "google_profiles" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "name" TEXT,
    "given_name" TEXT,
    "family_name" TEXT,
    "picture" TEXT,
    "email" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,
    "locale" TEXT,

    CONSTRAINT "google_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_id_key" ON "google_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_provider_id_key" ON "google_profiles"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_email_key" ON "google_profiles"("email");
