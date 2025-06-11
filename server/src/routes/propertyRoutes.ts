import express from "express";

import multer from "multer";

import {
  createProperty,
  getProperties,
  getProperty,
} from "../controllers/propertyController";
import { authMiddleware } from "../middleware/authMiddleware";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProperties);
router.put("/:id", getProperty);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);

export default router;
