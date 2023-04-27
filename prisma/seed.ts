import {
  ConsultStatus,
  ListSpecialties,
  Genders,
  Doctor,
  Patient,
  User,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

import prisma from "../src/config/database.js";

async function createClinicReference() {
  const clinicAlreadExists = await prisma.user.findFirst({
    where: {
      email: "cbe@gmail.com",
    },
  });

  const password = "123456";
  const passwordHash = await bcrypt.hash(password, 12);

  if (!clinicAlreadExists) {
    return await prisma.user.create({
      data: {
        name: "Clínica Bem Estar",
        email: "cbe@gmail.com",
        password: passwordHash,
      },
    });
  }
  return clinicAlreadExists;
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
  status: ConsultStatus,
  clinicId: number
) {
  await prisma.consult.create({
    data: {
      doctorId: doctorId.id,
      patientId: patientId.id,
      startsAt,
      endsAt,
      status,
      clinicId,
    },
  });
}

async function createManyConsults(clinicReference: User) {
  let status: ConsultStatus;
  const clinicId = clinicReference.id;
  //CARDIOLOGISTA
  const CARDIOLOGISTA_01 = await createDoctor(ListSpecialties.CARDIOLOGISTA);
  const patient_01 = await createPatient(Genders.MALE);
  let startsAt = new Date("2023-05-02T14:00:00-00:00");
  let endsAt = new Date("2023-05-02T14:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    CARDIOLOGISTA_01,
    patient_01,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  //CLINICO_GERAL
  const CLINICO_GERAL_02 = await createDoctor(ListSpecialties.CLINICO_GERAL);
  const patient_02 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-05-02T14:00:00-00:00");
  endsAt = new Date("2023-05-02T14:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    CLINICO_GERAL_02,
    patient_02,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  //DERMATOLOGISTA
  const DERMATOLOGISTA_03 = await createDoctor(ListSpecialties.DERMATOLOGISTA);
  const patient_03 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-05-02T10:00:00-00:00");
  endsAt = new Date("2023-05-02T10:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    DERMATOLOGISTA_03,
    patient_03,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_13 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T15:00:00-00:00");
  endsAt = new Date("2023-05-02T15:30:00-00:00");
  status = ConsultStatus.RETORNO;
  await createConsult(
    DERMATOLOGISTA_03,
    patient_13,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  //NUTRICIOLISTA
  const NUTRICIONISTA_04 = await createDoctor(ListSpecialties.NUTRICIONISTA);
  const patient_04 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T10:20:00-00:00");
  endsAt = new Date("2023-05-02T11:00:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    NUTRICIONISTA_04,
    patient_04,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_14 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-05-02T11:20:00-00:00");
  endsAt = new Date("2023-05-02T11:40:00-00:00");
  status = ConsultStatus.RETORNO;
  await createConsult(
    NUTRICIONISTA_04,
    patient_14,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_10 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-05-02T13:00:00-00:00");
  endsAt = new Date("2023-05-02T13:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    NUTRICIONISTA_04,
    patient_10,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  //OTORRINOLARINGOLOGISTA
  const OTORRINOLARINGOLOGISTA_05 = await createDoctor(
    ListSpecialties.OTORRINOLARINGOLOGISTA
  );
  const patient_05 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T10:15:00-00:00");
  endsAt = new Date("2023-05-02T10:45:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_05,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_09 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T11:00:00-00:00");
  endsAt = new Date("2023-05-02T11:30:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_09,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_12 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T15:00:00-00:00");
  endsAt = new Date("2023-05-02T15:50:00-00:00");
  status = ConsultStatus.CANCELADO;
  await createConsult(
    OTORRINOLARINGOLOGISTA_05,
    patient_12,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  //PSIQUIATRA
  const PSIQUIATRA_06 = await createDoctor(ListSpecialties.PSIQUIATRA);
  const patient_06 = await createPatient(Genders.FEMALE);
  startsAt = new Date("2023-05-02T14:00:00-00:00");
  endsAt = new Date("2023-05-02T14:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    PSIQUIATRA_06,
    patient_06,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_07 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T15:00:00-00:00");
  endsAt = new Date("2023-05-02T15:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    PSIQUIATRA_06,
    patient_07,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_08 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T16:00:00-00:00");
  endsAt = new Date("2023-05-02T16:50:00-00:00");
  status = ConsultStatus.AGUARDANDO;
  await createConsult(
    PSIQUIATRA_06,
    patient_08,
    startsAt,
    endsAt,
    status,
    clinicId
  );

  const patient_11 = await createPatient(Genders.MALE);
  startsAt = new Date("2023-05-02T15:00:00-00:00");
  endsAt = new Date("2023-05-02T15:50:00-00:00");
  status = ConsultStatus.CANCELADO;
  await createConsult(
    PSIQUIATRA_06,
    patient_11,
    startsAt,
    endsAt,
    status,
    clinicId
  );
}

async function main() {
  const clinicReference = await createClinicReference();
  await createManyConsults(clinicReference);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
