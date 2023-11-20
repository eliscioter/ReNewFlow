-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('CCPE', 'PCPE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "name" VARCHAR(255),
    "username" VARCHAR(55) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberName" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(55) NOT NULL,
    "middleName" VARCHAR(55),
    "lastName" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "MemberName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberFiles" (
    "id" TEXT NOT NULL,
    "regionalCert" VARCHAR(55) NOT NULL,
    "nationalCert" VARCHAR(55) NOT NULL,
    "receipt" VARCHAR(55) NOT NULL,
    "picture" VARCHAR(55) NOT NULL,
    "signature" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,

    CONSTRAINT "MemberFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(4) NOT NULL,
    "mobileNumber" VARCHAR(11) NOT NULL,
    "gender" "Gender" NOT NULL,
    "type" "MemberType" NOT NULL,
    "dateIdValidity" DATE NOT NULL,
    "transactionDetails" VARCHAR(255) NOT NULL,
    "region" VARCHAR(55) NOT NULL,
    "batchNo" VARCHAR(12) NOT NULL,
    "amountPaid" DECIMAL(10,2) NOT NULL,
    "submittedAt" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MemberName_memberId_key" ON "MemberName"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberFiles_memberId_key" ON "MemberFiles"("memberId");

-- AddForeignKey
ALTER TABLE "MemberName" ADD CONSTRAINT "MemberName_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberFiles" ADD CONSTRAINT "MemberFiles_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
