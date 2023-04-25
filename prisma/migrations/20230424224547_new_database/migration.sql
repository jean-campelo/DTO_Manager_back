/*
  Warnings:

  - The values [REAGENDADO,ENCAIXE] on the enum `ConsultStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Consult` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `endsAt` to the `Consult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Consult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsultStatus_new" AS ENUM ('REALIZADO', 'CANCELADO', 'RETORNO');
ALTER TABLE "Consult" ALTER COLUMN "status" TYPE "ConsultStatus_new" USING ("status"::text::"ConsultStatus_new");
ALTER TYPE "ConsultStatus" RENAME TO "ConsultStatus_old";
ALTER TYPE "ConsultStatus_new" RENAME TO "ConsultStatus";
DROP TYPE "ConsultStatus_old";
COMMIT;

-- DropIndex
DROP INDEX "Doctor_email_key";

-- DropIndex
DROP INDEX "Doctor_password_key";

-- AlterTable
ALTER TABLE "Consult" DROP COLUMN "date",
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "specialty" VARCHAR(255) NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_specialty_key" ON "Specialty"("specialty");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
