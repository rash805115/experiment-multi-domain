'use strict'

const Connect = require('connect')
const http = require('http')
const Redis = require('redis')
const SocketIO = require('socket.io')
const session = require('express-session')
const Store = require('connect-redis')(session)

const config = require('./configurations/development')

const BodyparserMiddleware = require('./middlewares/bodyparser')
const CompressionMiddleware = require('./middlewares/compression')
const SessionMiddleware = require('./middlewares/session')

const ControllerRouter = require('./routes')

let app = Connect()

let host = config.server.host
let port = config.server.port

// Redis setup.
let redis = Redis.createClient({
  host: config.redis.host,
  port: config.redis.port
})
let redisSubscriber = redis.duplicate()

// Startup Sequence.
let server = http.createServer(app)

// socket.io setup.
let pingInterval = config.server.websocket.pingInterval
let pingTimeout = config.server.websocket.pingTimeout
let socketIOOptions = { wsEngine: 'ws', pingInterval: pingInterval, pingTimeout: pingTimeout }
let io = SocketIO(server, socketIOOptions)

// Route registering sequence. Setup middleware.
const sessionStore = new Store({
  client: redis,
  prefix: config.redis.sessionPrefix
})
SessionMiddleware.apply(app, config.session, sessionStore)
CompressionMiddleware.apply(app)
BodyparserMiddleware.apply(app, 'json', { type: 'application/json' })

// Route registering sequence. Setup http routes.
let controllerRouter = new ControllerRouter()
controllerRouter.register(app)

server.listen(port, host, function () {
  // Register application events.
  redisSubscriber.on('pmessage', function (pattern, channel, message) {
    console.log('Redis event received: ' + JSON.stringify({ redisEvent: { pattern: pattern, message: message } }))
  })
  redisSubscriber.psubscribe(
    '__keyevent@*__:set',
    '__keyevent@*__:del',
    '__keyevent@*__:expired',
    (error) => { if (error) handleShutdown() }
  )

  console.log('Server started on ' + host + ':' + port)
})

// Shutdown Sequence.
let handleShutdown = function (callback) {
  io.close()

  server.close(function () {
    redisSubscriber.unsubscribe()
    redisSubscriber.quit()
    redis.quit()

    console.log('Server stopped on ' + host + ':' + port)

    if (callback) callback()
  })
}
process.on('SIGTERM', handleShutdown)
process.on('SIGINT', handleShutdown)
