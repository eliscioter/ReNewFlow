/*
  Warnings:

  - Added the required column `actionTaken` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('Registered', 'Renewed');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "actionTaken" "ActionType" NOT NULL;
