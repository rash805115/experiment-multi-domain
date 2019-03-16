'use strict'

module.exports = {
  'redis': {
    'host': 'localhost',
    'port': 6379,
    'sessionPrefix': 'session:'
  },
  'server': {
    'host': '0.0.0.0',
    'port': 8080,
    'websocket': {
      'pingInterval': 25000,
      'pingTimeout': 270000
    }
  },
  'session': {
    'cookie': {
      'secure': false
    },
    'name': 'session',
    'secret': [
      'syx3VZM8pEv8HRBCMhqhBMjD',
      'ZwgVvPz6TGZAfr4Bx8TubsY9',
      'Z5WgSHQ56GYYBCgZmLzKH326'
    ]
  }
}
