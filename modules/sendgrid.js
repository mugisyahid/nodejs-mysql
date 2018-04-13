'use strict'

const sgMail = require('@sendgrid/mail')
const config = require('../config')
const logger = require('../service/logger')

sgMail.setApiKey(config.sendgrid.secret)

exports.sendMail = function (to, from, subject, text, html) {
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html,
    }
    sgMail.send(msg)
}