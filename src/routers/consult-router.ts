import { Router } from "express";
import consultController from "../controllers/consult-controller.js";

const consultRouter = Router();

consultRouter.get("/:date", consultController.getConsults)
consultRouter.get("/week/:date", consultController.getConsultsWeek);

export default consultRouter;
