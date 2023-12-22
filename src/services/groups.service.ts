import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllByEventId = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } });
  } catch (err) {
    return false;
  }
};

type Filters = { id: number; id_event?: number };
export const filter = async (filters: Filters) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filters });
  } catch (err) {
    return false;
  }
};
