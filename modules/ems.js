'use strict'

const config = require('../config')
const logger = require('../service/logger')
const FileService = require('../service/file')
const email = require('./sendgrid')
const emailDb = require('../query/email')

const fileService = new FileService()

let scheduleId

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i].toLowerCase() === obj.toLowerCase()) {
            return true;
        }
    }
    return false;
}


Array.prototype.kontains = function (obj) {
    var i = this.length;
    while (i--) {
        if (obj.toLowerCase().includes(this[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}


function getTimeStamp(callback) {
    fileService.readFileSync(config.timeStampFile, callback)
}

function setTimeStamp(content, callback) {
    fileService.writeFile(config.timeStampFile, content, callback)
}

function getTemplate(content, callback) {
    emailDb.getTemplate(function (err, rows) {
        if (!err) {
            rows.forEach(function (row) {
                if (content.subject) {
                    const keyword = row.keywords.split(",").map(function (s) { return String.prototype.trim.apply(s); })
                    const noKeyword = row.not_keywords.split(",").map(function (s) { return String.prototype.trim.apply(s); })
                    let template = row.templates.replace("${name}", content.from_name)
                    template = template.replace("${subject}", content.subject)
                    template += "<blockquote>"
                    template += content.message_html
                    template += "</blockquote>"                
                    if (config.isTest) {
                        // mail mode
                        if (keyword.contains(content.from_address) && noKeyword.kontains(content.subject)) {
                            callback(content.from_address, config.mailFrom, config.reText + content.subject, 'asdf', template)
                        }
                    } else {
                        // subject mode
                        if (keyword.kontains(content.subject) && !noKeyword.kontains(content.subject)) {
                            callback(content.from_address, config.mailFrom, config.reText + content.subject, 'asdf', template)
                        }
                    }

                }
                setTimeStamp(content.timestamp, function (data) {
                    logger.debug('set timestamp to: ' + data)
                })
            })
        } else {
            logger.info('Error: ' + err)
        }
    })
}

function sendMail(mailTo, mailFrom, subject, text, html) {
    email.sendMail(mailTo, mailFrom, subject, text, html)
    logger.info('send mail to: ' + mailTo + ' [' + subject + ']')
}

function scheduleTask() {
    getTimeStamp(function (time) {
        emailDb.getNewMail(time, function (err, rows) {
            if (!err) {
                if (rows.length > 0) logger.info('[New Mail] : ' + rows.length)
                rows.forEach(function (row) {
                    logger.debug('[Mail] : ' + row.from_address + '[Subject]' + row.subject)
                    getTemplate(row, sendMail)
                })
            } else {
                logger.info('Error: ' + err)
            }
        })
    })
}

exports.start = function () {
    if (scheduleId) {
        return 'service already started'
    } else {
        logger.info('starting email service')
        scheduleId = setInterval(scheduleTask, config.timerTask)
        return 'email service started'
    }
}


exports.stop = function () {
    if (scheduleId) {
        clearInterval(scheduleId)
        scheduleId = null
        return 'email service stopped'
    } else {
        return 'email service not yet started'
    }
}