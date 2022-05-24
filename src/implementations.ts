import { IController } from './controllers/i.controller'
import { HeroController } from './controllers/hero.controller'
import { FetchHerosUc } from './useCases/hero/fetch.heros'

class Implementations {
    controllerHero: IController

    constructor() {

        this.controllerHero  = new HeroController(new FetchHerosUc())
    }

}

export {
    Implementations
}