"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const tenetRoutes_1 = __importDefault(require("./routes/tenetRoutes"));
const leaseRoutes_1 = __importDefault(require("./routes/leaseRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/tenants", tenetRoutes_1.default);
app.use("/managers", (0, authMiddleware_1.authMiddleware)(["manager"]), managerRoutes_1.default);
app.use("/properties", (0, authMiddleware_1.authMiddleware)(["manager"]), propertyRoutes_1.default);
app.use("/leases", leaseRoutes_1.default);
app.use("/applications", applicationRoutes_1.default);
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
