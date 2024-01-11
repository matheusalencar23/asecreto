import { PrismaClient, Prisma } from "@prisma/client";
import * as eventsService from "./events.service";

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

type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const create = async (data: GroupsCreateData) => {
  try {
    if (!data.id_event) return false;
    const event = await eventsService.getById(data.id_event);
    if (!event) return false;
    return await prisma.eventGroup.create({ data });
  } catch (err) {
    return false;
  }
};
