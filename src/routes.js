'use strict'

const Utils = require('./utilities/utils')

class ControllerRouter {
  register (app) {
    app.use('/', function (request, response) {
      const host = Utils.searchMapIgnoreCase(request.headers, 'host')
      let route = host + request.originalUrl + ':' + request.method.toUpperCase()
      console.log('Received new request: ' + route + ' with session: ' + JSON.stringify(request.session))

      request.session.data = { host: host }

      response.writeHead(200)
      response.write(host + ' OK')
      response.end()
    })

    // Error middleware. Catches all error and sends a generic response.
    // noinspection JSUnusedLocalSymbols
    app.use('/', function (error, request, response, next) {
      if (response.headersSent) return

      let code = error.code || 500
      let message = error.message || 'Server error.'

      console.log('ERROR: ' + message + ': ' + JSON.stringify({ stack: error.stack }))

      response.status(code).send(message)
    })
  }
}

module.exports = ControllerRouter

/**
 * The session middleware is applied on all routes.
 * These includes routes for static content of the plugin as well.
 * If a plugin is requested, all static content will trigger a session re-touch.
 * This will cause the session `set` event to be called multiple times for single request.
 * For a website, it is fixed by not applying sessions on certain routes.
 * https://github.com/expressjs/session/issues/114
 * Unfortunately, we can't implement the solution as we don't know plugin's static file structures.
 */
