import prisma from "../config/database.js";

async function getConsultByDate(date: string) {
  return prisma.consult.findMany({
    where: {
      startsAt: {
        startsWith: date,
      },
    },
    include: {
      Doctor: true,
      Patient: true,
    },
    orderBy: {
      startsAt: "asc",
    },
  });
}

const consultRepository = {
  getConsultByDate,
};

export default consultRepository;
