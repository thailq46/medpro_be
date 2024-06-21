import {Server as ServerHttp} from 'http'
import {Server} from 'socket.io'

export const initSocket = (httpServer: ServerHttp) => {
  const io = new Server(httpServer, {
    // Cấp phép cho domain có thể kết nối tới server
    cors: {origin: 'http://localhost:3000'}
  })

  io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected 123`)
  })
}
