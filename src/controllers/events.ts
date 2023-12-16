import { RequestHandler } from "express";
import * as eventsService from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
  const items = await eventsService.getAll();

  if (items) return res.json({ events: items });

  res.json({ error: "Ocorreu um erro" });
};

export const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const event = await eventsService.getById(parseInt(id));

  if (event) return res.json(event);

  res.json({ error: "Ocorreu um erro" });
};

export const create: RequestHandler = async (req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = addEventSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newEvent = await eventsService.create(body.data);
  if (newEvent) return res.status(201).json(newEvent);

  res.json({ error: "Ocorreu um erro" });
};
