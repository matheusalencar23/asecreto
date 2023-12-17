import { RequestHandler } from "express";
import * as groupsService from "../services/groups.service";

export const getAllByEventId: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const groups = await groupsService.getAllByEventId(parseInt(id_event));

  if (groups) return res.json({ groups });

  res.json({ error: "Ocorreu um erro" });
};
