import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { parse } from 'node:url'
import { router } from './routes'


const handler: RequestListener = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {

    const {url, method} = request
    const urlString: string = url ? url : ''
    const { pathname } = parse(urlString, true)
    const requestResource:string = `${pathname}`
    const requestMethod:string = `${method?.toLowerCase()}`
    // console.log(`${requestMethod} :: ${requestResource}`)

    await router.execute(requestMethod, requestResource, request, response)

}

export {
    handler
}