import { GenericHttpRequest, GenericHttpResponse, IController } from './i.controller'

class HeroController implements IController {

    async handle(httpRequest: GenericHttpRequest): Promise<GenericHttpResponse> {
        
        return {
            data: [
                {
                    name: 'Bruce',
                    age: 45
                }
            ]
        }

    }
}

export {
    HeroController
}