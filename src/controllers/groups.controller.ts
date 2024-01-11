import { RequestHandler } from "express";
import * as groupsService from "../services/groups.service";
import { z } from "zod";

export const getAllByEventId: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const groups = await groupsService.getAllByEventId(parseInt(id_event));

  if (groups) return res.json({ groups });

  res.json({ error: "Ocorreu um erro" });
};

export const getByIdAndEventId: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params;
  const filters = { id: parseInt(id), id_event: parseInt(id_event) };
  const group = await groupsService.filter(filters);

  if (group) return res.json(group);

  res.json({ error: "Ocorreu um erro" });
};

export const createByEventId: RequestHandler = async (req, res) => {
  const { id_event } = req.params;
  const addGroupSchema = z.object({
    name: z.string(),
  });

  const body = addGroupSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Ocorreu um erro" });

  const newGroup = await groupsService.create({
    ...body.data,
    id_event: parseInt(id_event),
  });

  if (newGroup) return res.status(201).json(newGroup);

  res.json({ error: "Ocorreu um erro" });
};
