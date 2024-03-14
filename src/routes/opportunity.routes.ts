import { Router } from "express";
import { container } from "tsyringe";
import { OpportunityControllers } from "../controllers/opportunity.controllers";
import { IsOpportunityIdValid } from "../middlewares/isOpportunityIdValid.middlewares";
import { IsOpportunityOwner } from "../middlewares/isOpportunityOwner.middleware";
import {
  opportunityCreateSchema,
  opportunityUpdateSchema,
} from "../schemas/opportunity.schemas";
import { OpportunityServices } from "../services/opportunity.services";
import { ValidateBody } from "./../middlewares/validateBody.middlewares";
import { ValidateToken } from "./../middlewares/validateToken.middleware";
import { applicationRouter } from "./application.routes";

container.registerSingleton("OpportunityServices", OpportunityServices);
const opportunityControllers = container.resolve(OpportunityControllers);

export const opportunityRouter = Router();

opportunityRouter.post(
  "/",
  ValidateToken.execute,
  ValidateBody.execute(opportunityCreateSchema),
  (req, res) => opportunityControllers.create(req, res)
);

opportunityRouter.get("/", (req, res) =>
  opportunityControllers.findMany(req, res)
);

opportunityRouter.get("/user", ValidateToken.execute, (req, res) =>
  opportunityControllers.findMany(req, res)
);

opportunityRouter.use("/:id", IsOpportunityIdValid.execute);
opportunityRouter.get(
  "/:id",
  ValidateToken.execute,
  IsOpportunityOwner.execute,
  (req, res) => opportunityControllers.findOne(req, res)
);
opportunityRouter.patch(
  "/:id",
  ValidateToken.execute,
  IsOpportunityOwner.execute,
  ValidateBody.execute(opportunityUpdateSchema),
  (req, res) => opportunityControllers.update(req, res)
);
opportunityRouter.delete(
  "/:id",
  ValidateToken.execute,
  IsOpportunityOwner.execute,
  (req, res) => opportunityControllers.delete(req, res)
);

opportunityRouter.use("/", applicationRouter);
