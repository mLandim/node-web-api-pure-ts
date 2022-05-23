import { IController } from './controllers/i.controller'
import { HeroController } from './controllers/hero.controller'

class Implementations {
    controllerHero: IController

    constructor() {

        this.controllerHero  = new HeroController()
    }

}

export {
    Implementations
}