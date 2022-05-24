import { IncomingMessage, ServerResponse } from "node:http";
import Router, {ResponseWrapper} from "./Router";
import { Implementations } from '../implementations' 


class HeroRouter {
    private routerObject: Router
    private controllers: Implementations

    constructor(controllers: Implementations) {
        this.controllers = controllers
        this.routerObject = new Router()
    }

    router(): Router {

        this.routerObject.get('/', async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
            try {

                const result = await this.controllers.controllerHero.handle(request)
                new ResponseWrapper(response).status(200).json(result).end()
            
            } catch (error) {
                console.log(error)
            }
            

        })

        return this.routerObject
    }

    
}

export {
    HeroRouter
}