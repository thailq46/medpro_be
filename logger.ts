import path from 'path'
import winston, {createLogger, format} from 'winston'

const filename = path.join(__dirname, 'created-logfile.log')

const logger = createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({filename})],

  format: format.combine(
    format.label({label: '[my-service]'}),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.simple(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  )
})

export default logger
