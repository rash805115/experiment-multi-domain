'use strict'

let compression = require('compression')

class CompressionMiddleware {
  static apply (app) {
    app.use('/', compression())
  }
}

module.exports = CompressionMiddleware
