'use strict'

const router = require('express').Router()
const logger = require('../service/logger')
const ems = require('../modules/ems')
const mail = require('../modules/sendgrid')


router.get('/', function(req, res, next){
    res.send('hello world')
})

router.get('/start', function(req, res, next) {
    res.send(ems.start())    
})

router.get('/stop', function(req, res, next) {
    res.send(ems.stop())
})

router.get('/test', function(req, res, next) {
    const mailTo = req.query.email
    if (mailTo) {
        mail.sendMail(mailTo, 'test@ganteng.com', 'Testing email', '', '<strong>lililili</strong>')
        res.send('Sending email to: ' + mailTo)
    } else {
        res.send('Please specify the email')
    }
})

module.exports = router