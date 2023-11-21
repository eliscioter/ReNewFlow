/*
  Warnings:

  - Added the required column `birthPlace` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "birthPlace" VARCHAR(55) NOT NULL,
ADD COLUMN     "typeNo" VARCHAR(55),
ALTER COLUMN "type" DROP NOT NULL;
