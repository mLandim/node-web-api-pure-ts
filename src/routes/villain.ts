import { IncomingMessage, ServerResponse } from "node:http";
import Router from "./Router";
import { DEFAULT_HEADER } from '../utils/headers'
// import { HeroController } from '../controllers/hero.controller'

const villainRouter: Router = new Router()
villainRouter.get('/', async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    // const dados = await 
    response.writeHead(200, DEFAULT_HEADER)
    response.write(JSON.stringify({dados:['joker', 'two-face']}))
    response.end()
    
})
// console.log(villainRouter)
export {
    villainRouter
}