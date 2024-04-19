import {Express} from 'express-serve-static-core'
import authRouter from '~/routes/auth.routes'
import usersRouter from '~/routes/users.routes'

function router(app: Express) {
  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
}

export default router
