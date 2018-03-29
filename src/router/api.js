'use strict'
//mysql
const DB = require('../service/mysqldb')

//email service
const EmailService = require('../service/email')
const emailService = new EmailService(DB)

const router = require('express').Router()

router.get('/start', function(req, res, next) {
    res.send(emailService.start())
})

router.get('/stop', function(req, res, next) {
    res.send(emailService.stop())
})


module.exports = router