import { ConsultStatus, Doctor, Patient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

import prisma from "../src/config/database";

async function createClinicBemEstar() {
  const clinicAlreadExists = await prisma.user.findFirst({
    where: {
      email: "cbe@gmail.com",
    },
  });

  if (!clinicAlreadExists) {
    await prisma.user.create({
      data: {
        email: "cbe@gmail.com",
        password: "123456",
      },
    });
  }
}

/*
async function createDoctor() {
  const doctor = await prisma.doctor.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      CRM: parseInt(faker.phone.number("######")),
    },
  });
  return doctor;
}
*/
async function createPatient() {
  const patient = await prisma.patient.create({
    data: {
      name: faker.name.fullName(),
      CPF: generateCPF(),
      gender: faker.name.gender(),
      birthday: faker.date.birthdate(),
      phone: faker.phone.number("(##) 9####-####"),
    },
  });
  return patient;
}
/*
async function createConsult(
  doctorId: Doctor,
  patientId: Patient,
  status: ConsultStatus,
  days: number
) {
  await prisma.consult.create({
    data: {
      doctorId: doctorId.id,
      patientId: patientId.id,
      startsAt,
      endsAt,
      status,
    },
  });
}
*/
async function main() {
  await createPatient();
  /*
  const doctor_01 = await createDoctor();
  const patient_01 = await createPatient();
  let daysAfterToday = 2;
  await createConsult(
    doctor_01,
    patient_01,
    ConsultStatus.CANCELADO,
    daysAfterToday
  );

  daysAfterToday = 1;
  const doctor_02 = await createDoctor();
  const patient_02 = await createPatient();
  await createConsult(
    doctor_02,
    patient_02,
    ConsultStatus.CANCELADO,
    daysAfterToday
  );

  daysAfterToday = 3;
  const doctor_03 = await createDoctor();
  const patient_03 = await createPatient();
  await createConsult(
    doctor_03,
    patient_03,
    ConsultStatus.CANCELADO,
    daysAfterToday
  );

  daysAfterToday = 0;
  const doctor_04 = await createDoctor();
  const patient_04 = await createPatient();
  await createConsult(
    doctor_04,
    patient_04,
    ConsultStatus.REALIZADO,
    daysAfterToday
  );
*/
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
