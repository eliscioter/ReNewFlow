/*
  Warnings:

  - You are about to drop the `MemberFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MemberFiles" DROP CONSTRAINT "MemberFiles_memberId_fkey";

-- DropTable
DROP TABLE "MemberFiles";

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "picture" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "receipt" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signature" (
    "id" TEXT NOT NULL,
    "signature" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalCertificate" (
    "id" TEXT NOT NULL,
    "regionalCert" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "RegionalCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NationalCertificate" (
    "id" TEXT NOT NULL,
    "nationalCert" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "NationalCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Picture_memberId_key" ON "Picture"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_memberId_key" ON "Receipt"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_memberId_key" ON "Signature"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "RegionalCertificate_memberId_key" ON "RegionalCertificate"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "NationalCertificate_memberId_key" ON "NationalCertificate"("memberId");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalCertificate" ADD CONSTRAINT "RegionalCertificate_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NationalCertificate" ADD CONSTRAINT "NationalCertificate_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
