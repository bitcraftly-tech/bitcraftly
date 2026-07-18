-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('contact', 'newsletter');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'qualified', 'closed', 'spam');

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL,
    "leadType" "LeadType" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "intent" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "website" TEXT,
    "source" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL,
    "referer" TEXT,
    "userAgent" TEXT,
    "notificationSentAt" TIMESTAMP(3),
    "notificationError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_submittedAt_idx" ON "leads"("submittedAt" DESC);

-- CreateIndex
CREATE INDEX "leads_leadType_status_idx" ON "leads"("leadType", "status");
