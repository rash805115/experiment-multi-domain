'use strict'

class Utils {
  static searchMapIgnoreCase (map, needle) {
    for (let key in map) {
      if (map.hasOwnProperty(key) && key.toLowerCase() === needle.toLowerCase()) {
        return map[key]
      }
    }
  }
}

module.exports = Utils
