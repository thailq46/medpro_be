import {Express} from 'express-serve-static-core'
import authRouter from '~/routes/auth.routes'

function router(app: Express) {
  app.use('/auth', authRouter)
}

export default router
