import { Router } from "express";
import * as auth from "../controllers/auth";
import * as eventsController from "../controllers/events";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.get("/events", auth.validate, eventsController.getAll);
router.get("/events/:id", auth.validate, eventsController.getById);
router.post("/events", auth.validate, eventsController.create);
router.put("/events/:id", auth.validate, eventsController.update);
router.delete("/events/:id", auth.validate, eventsController.remove);

export default router;
