import "dotenv/config";
import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";


import { HandleErrors } from "./middlewares/handleErrors.middlewares";
import { opportunityRouter } from "./routes/opportunity.routes";
import { userRouter } from "./routes/user.routes";

export const app = express();
console.log(process.env.EXAMPLE1);

app.use(helmet());

app.use(json());

app.use("/opportunities", opportunityRouter);

app.use("/users", userRouter);

app.use(HandleErrors.execute);



