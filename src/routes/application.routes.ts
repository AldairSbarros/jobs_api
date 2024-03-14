import { Router } from "express";
import { container } from "tsyringe";
import { ApplicationControllers } from "../controllers/application.controllers";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { applicationCreateSchema } from "../schemas/application.schemas";
import { ApplicationServices } from "../services/application.services";

export const applicationRouter = Router();

container.registerSingleton("ApplicationServices", ApplicationServices);
const applicationControllers = container.resolve(ApplicationControllers);

applicationRouter.post("/:id/applications", ValidateBody.execute(applicationCreateSchema), (req, res) => applicationControllers.create(req, res));
applicationRouter.get("/:id/applications", ValidateToken.execute, (req, res) => applicationControllers.findMany(req, res));