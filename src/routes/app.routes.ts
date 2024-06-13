import {Express} from 'express-serve-static-core'
import authRouter from '~/routes/auth.routes'
import categoriesRouter from '~/routes/categories.routes'
import doctorsRouter from '~/routes/doctors.routes'
import hospitalsRouter from '~/routes/hospitals.routes'
import mediasRouter from '~/routes/medias.routes'
import medicalBookingFormsRouter from '~/routes/medical-booking-forms.routes'
import schedulesRouter from '~/routes/schedule.routes'
import searchRouter from '~/routes/search.routes'
import servicesRoutes from '~/routes/services.routes'
import specialtiesRouter from '~/routes/specialties.routes'
import staticRouter from '~/routes/static.routes'
import usersRouter from '~/routes/users.routes'

function router(app: Express) {
  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  app.use('/medical-booking-forms', medicalBookingFormsRouter)
  app.use('/medias', mediasRouter)
  app.use('/static', staticRouter)
  app.use('/hospitals', hospitalsRouter)
  app.use('/services', servicesRoutes)
  app.use('/specialties', specialtiesRouter)
  app.use('/doctors', doctorsRouter)
  app.use('/schedules', schedulesRouter)
  app.use('/search', searchRouter)
}

export default router
