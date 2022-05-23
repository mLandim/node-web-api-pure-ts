import http, { Server } from 'node:http'
import { handler } from './handler'
const PORT: any = process.env.PORT || 3001

const server: Server = http.createServer(handler).listen(PORT, () => console.log(`Server running at ${PORT} with process ${process.pid}`))

export {
    server
}