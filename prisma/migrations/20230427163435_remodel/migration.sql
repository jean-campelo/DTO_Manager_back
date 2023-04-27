/*
  Warnings:

  - Added the required column `clinicId` to the `Consult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consult" ADD COLUMN     "clinicId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Consult" ADD CONSTRAINT "Consult_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
