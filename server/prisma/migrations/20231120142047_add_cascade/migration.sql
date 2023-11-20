-- DropForeignKey
ALTER TABLE "MemberFiles" DROP CONSTRAINT "MemberFiles_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberName" DROP CONSTRAINT "MemberName_memberId_fkey";

-- AddForeignKey
ALTER TABLE "MemberName" ADD CONSTRAINT "MemberName_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberFiles" ADD CONSTRAINT "MemberFiles_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
