"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapper = void 0;
const headers_1 = require("../utils/headers");
class Router {
    constructor(options) {
        this.useJSON = true;
        this.routes = {
            default: {
                get: (request, response) => __awaiter(this, void 0, void 0, function* () {
                    new ResponseWrapper(response).status(404).json({ error: 'Resource not found' }).end();
                }),
                // post: {},
                // put: {},
                // patch: {},
                // delete: {},
                // options: {},
                // head: {},
            }
        };
        this.errorsMap = {
            'MethodNotAllowedError': (response, errorMessage) => {
                let result = { error: 'Method not allowed' };
                if (errorMessage) {
                    result = { error: errorMessage };
                }
                new ResponseWrapper(response).status(405).json(result).end();
            }
        };
        if (options) {
            'useJSON' in options ? this.useJSON = options.useJSON : this.useJSON = true;
        }
    }
    set(method, resource, resourceHandler) {
        if (resource in this.routes && method in this.routes[resource] === false) {
            const res = this.routes[resource];
            res[method] = resourceHandler;
        }
    }
    get(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource] = {};
        }
        this.routes[resource].get = resourceHandler;
    }
    post(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].post = resourceHandler;
        }
    }
    put(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].put = resourceHandler;
        }
    }
    path(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].path = resourceHandler;
        }
    }
    delete(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].delete = resourceHandler;
        }
    }
    options(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].options = resourceHandler;
        }
    }
    head(resource, resourceHandler) {
        if (resource in this.routes === false) {
            this.routes[resource].head = resourceHandler;
        }
    }
    use(prefixResource, router) {
        try {
            for (let resource in router.routes) {
                if (resource !== 'default') {
                    const targetRoute = router.routes[resource];
                    const newRes = `${prefixResource}${resource}`;
                    router.routes[newRes] = targetRoute;
                    delete router.routes[resource];
                    Object.assign(this.routes, router.routes);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    execute(method, resource, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('execute')
            // console.log(`${method} :: ${resource}`)
            try {
                let chosenRoute = this.routes.default.get;
                if (resource in this.routes) {
                    if (method in this.routes[resource] === false) {
                        throw new MethodNotAllowedError(`Method [${method}] not allowed to this resource [${resource}]`);
                    }
                    chosenRoute = this.routes[resource][method];
                }
                return yield chosenRoute(request, response);
            }
            catch (error) {
                this.handlerError(response, error instanceof Error ? error : new Error('Not identified error'));
            }
        });
    }
    handlerError(response, error) {
        if (error instanceof Error) {
            console.log(error.name);
            if (error.name in this.errorsMap) {
                this.errorsMap[error.name](response, error.message);
            }
            else {
                console.log('Something bad has happened**', error === null || error === void 0 ? void 0 : error.stack);
                new ResponseWrapper(response).status(500).json({
                    error: 'Internal server error!'
                }).end();
            }
        }
        else {
            console.log('Something bad has happened**');
            new ResponseWrapper(response).status(500).json({
                error: 'Internal server error!'
            }).end();
        }
    }
}
exports.default = Router;
class MethodNotAllowedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'MethodNotAllowedError';
    }
}
class ResponseWrapper {
    constructor(response) {
        this.myResponse = response;
    }
    status(code, optionalHeader) {
        optionalHeader ? this.myResponse.writeHead(code, optionalHeader) : this.myResponse.writeHead(code, headers_1.DEFAULT_HEADER);
        return this;
    }
    json(data) {
        this.myResponse.write(JSON.stringify(data));
        return this;
    }
    end() {
        this.myResponse.end();
    }
}
exports.ResponseWrapper = ResponseWrapper;
