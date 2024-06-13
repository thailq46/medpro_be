import {Router} from 'express'
import {searchController} from '~/controllers/search.controllers'
import {searchValidator} from '~/middlewares/search.middlewares'

const searchRouter = Router()

searchRouter.get('/', searchValidator, searchController)

export default searchRouter
