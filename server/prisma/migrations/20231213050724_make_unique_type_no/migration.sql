/*
  Warnings:

  - A unique constraint covering the columns `[typeNo]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_typeNo_key" ON "Member"("typeNo");
