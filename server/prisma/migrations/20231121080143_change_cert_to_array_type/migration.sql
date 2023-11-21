/*
  Warnings:

  - The `regionalCert` column on the `MemberFiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nationalCert` column on the `MemberFiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MemberFiles" DROP COLUMN "regionalCert",
ADD COLUMN     "regionalCert" TEXT[],
DROP COLUMN "nationalCert",
ADD COLUMN     "nationalCert" TEXT[];
