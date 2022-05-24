import { UseCase } from '../useCases/i.use-cases'
import { GenericHttpRequest, GenericHttpResponse, IController } from './i.controller'

class HeroController implements IController {
    private useCase: UseCase
    constructor(useCase: UseCase) {
        this.useCase = useCase
    }
    async handle(httpRequest: GenericHttpRequest): Promise<GenericHttpResponse> {
        console.log(httpRequest.url)
        const data = await this.useCase.execute()
        return {data: data}

    }
}

export {
    HeroController
}