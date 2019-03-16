'use strict'

const session = require('express-session')

class SessionMiddleware {
  static apply (app, sessionConfig, sessionStore) {
    let options = {
      cookie: {
        expires: false,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: sessionConfig.cookie.secure
      },
      name: sessionConfig.name,
      proxy: undefined,
      resave: false,
      rolling: false,
      saveUninitialized: false,
      secret: sessionConfig.secret,
      store: sessionStore,
      unset: 'destroy'
    }

    app.use('/', session(options))
  }
}

module.exports = SessionMiddleware
