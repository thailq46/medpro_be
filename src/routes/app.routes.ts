import {Express} from 'express-serve-static-core'
import usersRouter from '~/routes/users.routes'

function router(app: Express) {
  app.use('/users', usersRouter)
}

export default router
