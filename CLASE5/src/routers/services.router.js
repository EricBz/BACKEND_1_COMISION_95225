import { Router } from "express";
import { getServices, getServicesById, createService, updateService, deleteService} from "../controllers/services.controller.js"


const serviceRouter = Router();

serviceRouter.get("/", getServices);

serviceRouter.get("/:id", getServicesById);

serviceRouter.post("/", createService);

serviceRouter.put("/:id", updateService);

serviceRouter.delete("/:id", deleteService);

export default serviceRouter;