"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const node_http_1 = __importDefault(require("node:http"));
const handler_1 = require("./handler");
const PORT = process.env.PORT || 3001;
const server = node_http_1.default.createServer(handler_1.handler).listen(PORT, () => console.log(`Server running at ${PORT} with process ${process.pid}`));
exports.server = server;
