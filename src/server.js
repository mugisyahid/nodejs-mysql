'use strict'

const express = require('express')
const cors = require('cors')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')


// custom import
const config = require('./config')
const logger = require('./service/logger')

const app = express()

app.use(cors())
app.use(require('morgan')('combined', { stream: { write: message => logger.info(message) } }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

logger.info('[config] ' + JSON.stringify(config))

if (!config.isProduction) {
  app.use(errorhandler())
}

// routes
app.use(require('./router'))

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (!config.isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  })
})

// start server...
const server = app.listen(config.port, function () {
  logger.info('[starting] ' + config.appName + ' : ' + server.address().port)
  // call api to start
  request('http://localhost' + ':' + server.address().port + '/start', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    logger.info(res.body);
  })

})
