import express from "express";

import { createManager, getManager, getManagerProperty, updateManager } from "../controllers/managerController";

const router = express.Router();

router.get("/:cognitoId", getManager);
router.put("/:cognitoId",updateManager)
router.post("/", createManager);
router.get("/:cognitoId/properties",getManagerProperty)

export default router;
