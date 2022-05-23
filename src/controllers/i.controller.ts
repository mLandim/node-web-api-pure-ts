export interface GenericHttpResponse<T = any> {
    statusCode?: number,
    statusMessage?: string,
    error?: string,
    success?: Boolean
    data?: T
}
export interface GenericHttpRequest {
    query?: any,
    params?: any,
    body?: any,
    url?: string,
    method?: string,
    headers?: any,

}

export interface IController {
    handle: (httpRequest: GenericHttpRequest) => Promise<GenericHttpResponse>
}