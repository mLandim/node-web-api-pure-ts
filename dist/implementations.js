"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Implementations = void 0;
const hero_controller_1 = require("./controllers/hero.controller");
class Implementations {
    constructor() {
        this.controllerHero = new hero_controller_1.HeroController();
    }
}
exports.Implementations = Implementations;
