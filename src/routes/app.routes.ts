import {Express} from 'express-serve-static-core'
import authRouter from '~/routes/auth.routes'
import categoriesRouter from '~/routes/categories.routes'
import medicalBookingFormsRouter from '~/routes/medical-booking-forms.routes'
import usersRouter from '~/routes/users.routes'
import mediasRouter from '~/routes/medias.routes'

function router(app: Express) {
  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/medical-booking-forms', medicalBookingFormsRouter)
  app.use('/medias', mediasRouter)
}

export default router
