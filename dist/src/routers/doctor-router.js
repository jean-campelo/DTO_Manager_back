import { Router } from "express";
import doctorController from "../controllers/doctor-controller.js";
//const doctorRouter = Router();
//doctorRouter.get("", doctorController.getDoctor);
//export { doctorRouter };
var router = Router();
router.get("/doctos", doctorController.getDoctor);
export default router;
