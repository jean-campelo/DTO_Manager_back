import { Router } from "express";
import consultController from "../controllers/consult-controller.js";

const consultRouter = Router();

consultRouter
    .get("/:date", consultController.getConsults)
    .get("/week/:date", consultController.getConsultsWeek)
    .get("/month/:date", consultController.getConsultsMonth);

export default consultRouter;
