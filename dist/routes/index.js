"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router_1 = __importDefault(require("./Router"));
const hero_router_1 = require("./hero.router");
const villain_1 = require("./villain");
const implementations_1 = require("../implementations");
const router = new Router_1.default();
exports.router = router;
const controllers = new implementations_1.Implementations();
router.use('/heroes', new hero_router_1.HeroRouter(controllers).router());
router.use('/villain', villain_1.villainRouter);
