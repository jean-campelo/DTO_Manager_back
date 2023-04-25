-- CreateEnum
CREATE TYPE "ListSpecialties" AS ENUM ('ORTOPEDISTA', 'DERMATOLOGISTA', 'NUTRICIONISTA', 'PSIQUIATRA', 'CARDIOLOGISTA', 'OTORRINOLARINGOLOGISTA', 'CLINICO_GERAL');

-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "ConsultStatus" AS ENUM ('REALIZADO', 'CANCELADO', 'RETORNO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "CRM" INTEGER NOT NULL,
    "specialty" "ListSpecialties" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "CPF" VARCHAR(255) NOT NULL,
    "gender" "Genders" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consult" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "ConsultStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_CRM_key" ON "Doctor"("CRM");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_CPF_key" ON "Patient"("CPF");

-- AddForeignKey
ALTER TABLE "Consult" ADD CONSTRAINT "Consult_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consult" ADD CONSTRAINT "Consult_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
