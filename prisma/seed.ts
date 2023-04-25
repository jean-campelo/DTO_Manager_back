import {
  ConsultStatus,
  ListSpecialties,
  Genders,
  Doctor,
  Patient,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

import prisma from "../src/config/database.js";

async function createClinicBemEstar() {
  const clinicAlreadExists = await prisma.user.findFirst({
    where: {
      email: "cbe@gmail.com",
    },
  });
  const password = "123456";
  const passwordHash = await bcrypt.hash(password, 12);

  if (!clinicAlreadExists) {
    await prisma.user.create({
      data: {
        email: "cbe@gmail.com",
        password: passwordHash,
      },
    });
  }
}

async function createDoctor(specialty: ListSpecialties) {
  const doctor = await prisma.doctor.create({
    data: {
      name: faker.name.fullName(),
      CRM: parseInt(faker.phone.number("######")),
      specialty,
    },
  });
  return doctor;
}

async function createPatient(gender: Genders) {
  const patient = await prisma.patient.create({
    data: {
      name: faker.name.fullName(),
      CPF: generateCPF(),
      gender,
      birthday: faker.date.birthdate(),
      phone: faker.phone.number("(##) 9####-####"),
    },
  });
  return patient;
}

async function createConsult(
  doctorId: Doctor,
  patientId: Patient,
  startsAt: Date,
  endsAt: Date,
  status: ConsultStatus
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

async function createConsults() {
  let status: ConsultStatus;

  //CARDIOLOGISTA
  const CARDIOLOGISTA_01 = await createDoctor(ListSpecialties.CARDIOLOGISTA);
  const patient_01 = await createPatient(Genders.MALE);
  let startsAt = new Date("2023-01-27T14:00:00-00:00");
  let endsAt = new Date("2023-01-27T14:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(CARDIOLOGISTA_01, patient_01, startsAt, endsAt, status);

  //CLINICO_GERAL
  const CLINICO_GERAL_02 = await createDoctor(ListSpecialties.CLINICO_GERAL);
  const patient_02 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-01-27T14:00:00-00:00");
  endsAt = new Date("2023-01-27T14:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(CLINICO_GERAL_02, patient_02, startsAt, endsAt, status);

  //DERMATOLOGISTA
  const DERMATOLOGISTA_03 = await createDoctor(ListSpecialties.DERMATOLOGISTA);
  const patient_03 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-01-27T10:00:00-00:00");
  endsAt = new Date("2023-01-27T10:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(DERMATOLOGISTA_03, patient_03, startsAt, endsAt, status);

  const patient_13 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T15:00:00-00:00");
  endsAt = new Date("2023-01-27T15:30:00-00:00");
  status = ConsultStatus.RETORNO;
  await createConsult(DERMATOLOGISTA_03, patient_13, startsAt, endsAt, status);

  //NUTRICIOLISTA
  const NUTRICIONISTA_04 = await createDoctor(ListSpecialties.NUTRICIONISTA);
  const patient_04 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T10:20:00-00:00");
  endsAt = new Date("2023-01-27T11:00:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(NUTRICIONISTA_04, patient_04, startsAt, endsAt, status);

  const patient_14 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-01-27T11:20:00-00:00");
  endsAt = new Date("2023-01-27T11:40:00-00:00");
  status = ConsultStatus.RETORNO;
  await createConsult(NUTRICIONISTA_04, patient_14, startsAt, endsAt, status);

  const patient_10 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-01-27T13:00:00-00:00");
  endsAt = new Date("2023-01-27T13:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(NUTRICIONISTA_04, patient_10, startsAt, endsAt, status);

  //OTORRINOLARINGOLOGISTA
  const OTORRINOLARINGOLOGISTA_05 = await createDoctor(
    ListSpecialties.OTORRINOLARINGOLOGISTA
  );
  const patient_05 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T10:15:00-00:00");
  endsAt = new Date("2023-01-27T10:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_05,
    startsAt,
    endsAt,
    status
  );

  const patient_09 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T11:00:00-00:00");
  endsAt = new Date("2023-01-27T11:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_09,
    startsAt,
    endsAt,
    status
  );

  const patient_12 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T15:00:00-00:00");
  endsAt = new Date("2023-01-27T15:50:00-00:00");
  status = ConsultStatus.CANCELADO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_12,
    startsAt,
    endsAt,
    status
  );

  //PSIQUIATRA
  const PSIQUIATRA_06 = await createDoctor(ListSpecialties.PSIQUIATRA);
  const patient_06 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-01-27T14:00:00-00:00");
  endsAt = new Date("2023-01-27T14:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(PSIQUIATRA_06, patient_06, startsAt, endsAt, status);

  const patient_07 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T15:00:00-00:00");
  endsAt = new Date("2023-01-27T15:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(PSIQUIATRA_06, patient_07, startsAt, endsAt, status);

  const patient_08 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T16:00:00-00:00");
  endsAt = new Date("2023-01-27T16:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(PSIQUIATRA_06, patient_08, startsAt, endsAt, status);

  const patient_11 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-01-27T15:00:00-00:00");
  endsAt = new Date("2023-01-27T15:50:00-00:00");
  status = ConsultStatus.CANCELADO;
  await createConsult(PSIQUIATRA_06, patient_11, startsAt, endsAt, status);
}

async function main() {
  await createClinicBemEstar();
  await createConsults();
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
