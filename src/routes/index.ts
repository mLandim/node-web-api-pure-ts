import Router from "./Router";
import { HeroRouter } from './hero.router'
import { villainRouter } from './villain'
import { Implementations } from '../implementations'

const router: Router = new Router()
const controllers = new Implementations()

router.use('/heroes', new HeroRouter(controllers).router())
router.use('/villain', villainRouter)

export {
    router
}