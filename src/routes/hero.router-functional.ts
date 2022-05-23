import { IncomingMessage, ServerResponse } from "node:http";
import Router from "./Router";
import { DEFAULT_HEADER } from '../utils/headers'

const heroRouter: Router = new Router()

heroRouter.get('/', async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    // const dados = await 
    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({dados:['batman', 'iron man']}))
    response.end()
    
})





export {
    heroRouter
}