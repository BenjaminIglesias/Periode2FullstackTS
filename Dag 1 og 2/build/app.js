"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import dotenv from "dotenv";
const path_1 = __importDefault(require("path"));
//dotenv.config()
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.get("/demo", (req, res) => {
    res.send("Server is up!!");
});
exports.default = app;
//const PORT = process.env.PORT || 3333;
//app.listen(PORT, () => console.log(`Server started, listening on PORT: ${PORT}`))
//# sourceMappingURL=app.js.map