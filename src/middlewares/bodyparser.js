'use strict'

let bodyParser = require('body-parser')

class BodyparserMiddleware {
  static apply (app, type, options) {
    if (type === 'json') {
      app.use('/', bodyParser.json(options))
    } else if (type === 'urlencoded') {
      app.use('/', bodyParser.urlencoded(options))
    }
  }
}

module.exports = BodyparserMiddleware
