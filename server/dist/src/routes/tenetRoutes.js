"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenetController_1 = require("../controllers/tenetController");
const router = express_1.default.Router();
router.get("/:cognitoId", tenetController_1.getTenant);
router.put("/:cognitoId", tenetController_1.updateTenant);
router.post("/", tenetController_1.createTenant);
router.get("/:cognitoId/current-residences", tenetController_1.getCurrentResidences);
router.post("/cognitoId/favorites/:propertyId", tenetController_1.addFavoriteProperty);
router.delete("/cognitoId/favorites/:propertyId", tenetController_1.removeFavoriteProperty);
exports.default = router;
