import { IncomingMessage, ServerResponse } from "node:http";
import { DEFAULT_HEADER } from "../utils/headers";

interface Route {
    (request: IncomingMessage, response: ServerResponse): Promise<void>
}
interface Method {
    [index: string]: Route

}
interface Resource {
    [index: string]: Route
}

interface Routes {
    [index: string]: Resource

}

interface Errors {
    [index: string]: Function
}

export default class Router {

    private routes: Routes
    useJSON: boolean = true
    private errorsMap: Errors

    constructor(options?: any) {
        

        this.routes = {
            
            default: {
                get: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
                    new ResponseWrapper(response).status(404).json({error: 'Resource not found'}).end()
                },
                // post: {},
                // put: {},
                // patch: {},
                // delete: {},
                // options: {},
                // head: {},
            }   
        }

        this.errorsMap = {
            'MethodNotAllowedError': (response: ServerResponse, errorMessage?: string): void => {
                let result = {error: 'Method not allowed'}
                if (errorMessage) {
                    result = {error: errorMessage}
                }
                new ResponseWrapper(response).status(405).json(result).end()
            }
        }


        if (options){
            'useJSON' in options ? this.useJSON = options.useJSON : this.useJSON = true
        }
        

    }

    

    set(method: string, resource: string, resourceHandler: Route) {
        if(resource in this.routes && method in this.routes[resource]===false) {
            const res = this.routes[resource]
            res[method] = resourceHandler
        }
    }

    get(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource] = {}
        }
        this.routes[resource].get = resourceHandler
    }

    post(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].post = resourceHandler
        }
    }

    put(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].put = resourceHandler
        }
    }

    path(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].path = resourceHandler
        }
    }

    delete(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].delete = resourceHandler
        }
    }

    options(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].options = resourceHandler
        }
    }

    head(resource: string, resourceHandler: Route) {
        if (resource in this.routes === false) {
            this.routes[resource].head = resourceHandler
        }
    }


    use(prefixResource: string, router: Router): void {
        
        try {
        
            for (let resource in router.routes) {

                if (resource !== 'default') {
                    const targetRoute = router.routes[resource]

                    const newRes = `${prefixResource}${resource}`
                    router.routes[newRes] = targetRoute
                    delete router.routes[resource]
                    Object.assign(this.routes, router.routes)

                }
            }
            
        } catch (error) {
            console.log(error)
        }
               
    }


    async execute(method: string, resource: string, request: IncomingMessage, response: ServerResponse): Promise<void> {
        // console.log('execute')
        // console.log(`${method} :: ${resource}`)
        try {
            let chosenRoute: Function =  this.routes.default.get
            
            if (resource in this.routes) {
                if (method in this.routes[resource] === false) {

                    throw new MethodNotAllowedError(`Method [${method}] not allowed to this resource [${resource}]`);
                    
                }
                chosenRoute = this.routes[resource][method]
                
                
            }

            return await chosenRoute(request, response)

        } catch (error) {

            this.handlerError(response, error instanceof Error ? error : new Error('Not identified error') )
        }
        

    }

    private handlerError(response: ServerResponse, error?: Error): void{
        if (error instanceof Error) {
            console.log(error.name)
            if (error.name in this.errorsMap) {
                this.errorsMap[error.name](response, error.message)
            } else {
                console.log('Something bad has happened**', error?.stack)
                new ResponseWrapper(response).status(500).json({
                    error: 'Internal server error!'
                }).end()
            }
            
        } else {
            console.log('Something bad has happened**')
            new ResponseWrapper(response).status(500).json({
                error: 'Internal server error!'
            }).end()
        }
        
    }

    

}


class MethodNotAllowedError extends Error {
    constructor(msg: string) {
        super(msg)
        this.name = 'MethodNotAllowedError'
    }
}



class ResponseWrapper {
    private myResponse: ServerResponse
    constructor(response: ServerResponse) {
        this.myResponse = response
    }
   
    status(code: number, optionalHeader?: string): ResponseWrapper {
        optionalHeader ? this.myResponse.writeHead( code, optionalHeader) : this.myResponse.writeHead(code, DEFAULT_HEADER)
        return this
    }
    json(data: any): ResponseWrapper {
        this.myResponse.write(JSON.stringify(data))
        return this
    }
    end(): void {
        this.myResponse.end()
    }
}

export {
    Route,
    ResponseWrapper
}