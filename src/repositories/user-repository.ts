import prisma from "../config/database.js";

async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function create(email: string, passwordHash: string, name: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });
}

const userRepository = {
  getUserByEmail,
  create
};

export default userRepository;
