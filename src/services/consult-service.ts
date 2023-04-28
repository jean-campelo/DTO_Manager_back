import { Consult } from "@prisma/client";
import { ConsultStatus } from "@prisma/client";
import consultRepository from "../repositories/consult-repository.js";
import dayjs from "dayjs";

async function findConsultsByDate(date: string) {
  const consultData = await consultRepository.getConsultByDate(date);

  const consults = consultData.map((item) => {
    const doctorName = item.Doctor.name;
    const doctorSpecialty = item.Doctor.specialty;
    const patientName = item.Patient.name;
    const patientGender = item.Patient.gender;
    const consultStarts = dayjs(item.startsAt).format("HH:mm");
    const consultEnds = dayjs(item.endsAt).format("HH:mm");
    const status = item.status;
    const age = dayjs(Date.now()).diff(item.Patient.birthday, "year");

    return {
      doctorName,
      doctorSpecialty,
      patientName,
      patientGender,
      consultStarts,
      consultEnds,
      status,
      age,
    };
  });

  const indicators = countIndicators(consults);

  return { indicators, consults };
}

function countIndicators(consults: any) {
  let consultsOpen = 0;
  let consultsCanceled = 0;
  let consultsDone = 0;
  for (let i = 0; i < consults.length; i++) {
    const consultStatus = consults[i].status;
    consultStatus === ConsultStatus.CANCELADO
      ? consultsCanceled++
      : consultStatus !== ConsultStatus.REALIZADO
      ? consultsOpen++
      : consultsDone++;
  }

  return { consultsOpen, consultsCanceled, consultsDone };
}

export type DateConsultParams = Pick<Consult, "startsAt">;

const consultService = {
  findConsultsByDate,
};

export default consultService;
