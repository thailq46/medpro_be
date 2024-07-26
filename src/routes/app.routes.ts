import {Express} from 'express-serve-static-core'
import appointmentsRouter from '~/routes/appoitments.routes'
import authRouter from '~/routes/auth.routes'
import categoriesRouter from '~/routes/categories.routes'
import conversationsRouter from '~/routes/conversations.routes'
import doctorsRouter from '~/routes/doctors.routes'
import hospitalsRouter from '~/routes/hospitals.routes'
import mediasRouter from '~/routes/medias.routes'
import medicalBookingFormsRouter from '~/routes/medical-booking-forms.routes'
import paymentRouter from '~/routes/payment.routes'
import schedulesRouter from '~/routes/schedule.routes'
import searchRouter from '~/routes/search.routes'
import servicesRoutes from '~/routes/services.routes'
import specialtiesRouter from '~/routes/specialties.routes'
import staticRouter from '~/routes/static.routes'
import usersRouter from '~/routes/users.routes'

function router(app: Express) {
  app.use('/api/auth', authRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/medical-booking-forms', medicalBookingFormsRouter)
  app.use('/api/medias', mediasRouter)
  app.use('/api/static', staticRouter)
  app.use('/api/hospitals', hospitalsRouter)
  app.use('/api/services', servicesRoutes)
  app.use('/api/specialties', specialtiesRouter)
  app.use('/api/doctors', doctorsRouter)
  app.use('/api/schedules', schedulesRouter)
  app.use('/api/search', searchRouter)
  app.use('/api/appointments', appointmentsRouter)
  app.use('/api/payment', paymentRouter)
  app.use('/api/conversations', conversationsRouter)
}

export default router
