import { Router } from "express";
import ViewController from "../controllers/view.controller.js";

const router = Router()

router.get("/services", ViewController.getServices)

export default router
