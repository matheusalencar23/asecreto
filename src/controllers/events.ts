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

export const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatedEvent = await eventsService.update(parseInt(id), body.data);

  if (updatedEvent) {
    if (updatedEvent.status) {
      //TODO: fazer o sorteio
    } else {
      //TODO: limpar o sorteio
    }

    return res.json(updatedEvent);
  }

  res.json({ error: "Ocorreu um erro" });
};

export const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await eventsService.remove(parseInt(id));

  if (deletedEvent) return res.json(deletedEvent);

  res.json({ error: "Ocorreu um erro" });
};
