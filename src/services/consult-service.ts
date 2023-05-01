import { Consult } from "@prisma/client";
import { ConsultStatus } from "@prisma/client";
import consultRepository from "../repositories/consult-repository.js";
import dayjs from "dayjs";

async function findConsultsByDate(date: string) {
  const consultData = await consultRepository.getConsultByDate(date);

  const consults = consultData.map((item) => {
    const clinicName = item.User.name;
    const id = item.id;
    const doctorName = item.Doctor.name;
    const doctorSpecialty = item.Doctor.specialty;
    const patientName = item.Patient.name;
    const patientGender = item.Patient.gender;
    const consultDate = dayjs(item.startsAt).format("DD-MM-YYYY");
    const weekDay = translateWeekDay(item.startsAt);
    const consultStarts = dayjs(item.startsAt).format("HH:mm");
    const consultEnds = dayjs(item.endsAt).format("HH:mm");
    const status = item.status;
    const age = dayjs(Date.now()).diff(item.Patient.birthday, "year");

    return {
      id,
      clinicName,
      doctorName,
      doctorSpecialty,
      patientName,
      patientGender,
      consultDate,
      weekDay,
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
  const consultsTotal = consultsOpen + consultsDone;

  return { consultsOpen, consultsCanceled, consultsDone, consultsTotal };
}

function translateWeekDay(consultDate: string) {
  const weekday = dayjs(consultDate).format("dddd");
  if (weekday === "Sunday") return "Domingo";
  if (weekday === "Monday") return "Segunda-feira";
  if (weekday === "Tuesday") return "Terça-feira";
  if (weekday === "Wednesday") return "Quarta-feira";
  if (weekday === "Thursday") return "Quinta-feira";
  if (weekday === "Friday") return "Sexta-feira";
  if (weekday === "Saturday") return "Sábado";
}

async function findConsultsWeek(date: string) {
  const initialWeek = dayjs(date).startOf("w").format("YYYY-MM-DD");
  const daysWeek = 7;
  let consultsWeek = [];

  for (let i = 0; i < daysWeek; i++) {
    const daySelected = dayjs(initialWeek).add(i, "day").format("YYYY-MM-DD");
    const consultDay = await findConsultsByDate(daySelected);
    const day = dayjs(daySelected).format("DD");
    const month = dayjs(daySelected).format("MM");

    consultsWeek = [
      ...consultsWeek,
      {
        day,
        month,
        date: daySelected,
        weekDay: translateWeekDay(daySelected),
        consultDay,
      },
    ];
  }
  return consultsWeek;
}

export type DateConsultParams = Pick<Consult, "startsAt">;

const consultService = {
  findConsultsByDate,
  findConsultsWeek,
};

export default consultService;
