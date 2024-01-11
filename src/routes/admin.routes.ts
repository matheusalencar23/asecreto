import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import * as eventsController from "../controllers/events.controller";
import * as groupsController from "../controllers/groups.controller";

const router = Router();

router.post("/login", authController.login);

router.get("/ping", authController.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.get("/events", authController.validate, eventsController.getAll);
router.get("/events/:id", authController.validate, eventsController.getById);
router.post("/events", authController.validate, eventsController.create);
router.put("/events/:id", authController.validate, eventsController.update);
router.delete("/events/:id", authController.validate, eventsController.remove);

router.get(
  "/events/:id_event/groups",
  authController.validate,
  groupsController.getAllByEventId
);
router.get(
  "/events/:id_event/groups/:id",
  authController.validate,
  groupsController.getByIdAndEventId
);
router.post(
  "/events/:id_event/groups",
  authController.validate,
  groupsController.createByEventId
);

export default router;
