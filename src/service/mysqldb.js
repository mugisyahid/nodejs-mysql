'use strict'

const mysql = require('mysql')
const config = require('../config')
const logger = require('../service/logger')

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.user,
  database: config.mysql.database
})

const DB = (function () {

  function _query(query, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release()
        callback(null, err)
        throw err
      }

      connection.query(query, params, function (err, rows) {
        connection.release()
        if (!err) {
          callback(rows)
        }
        else {
          callback(null, err)
        }

      })

      connection.on('error', function (err) {
        connection.release()
        callback(null, err)
        throw err
      })
    })
  }

  return {
    query: _query
  }
})()

module.exports = DB