'use strict'

const config = require('../config')
const logger = require('./logger')
const FileService = require('./file')

// Email Service
class EmailService {

    constructor(database) {
        this.database = database;
        this.fileService = new FileService()
    }

    start() {
        if (this.intervalId) {
            return 'service already started'
        } else {
            logger.info('starting email service')

            const that = this

            this.getTimeStamp = function (callback) {
                this.fileService.readFileSync(config.timeStampFile, callback)
            }

            this.setTimeStamp = function (content, callback) {
                this.fileService.writeFile(config.timeStampFile, content, callback)
            }

            this.getQuery = function (query, param, callback) {
                this.database.query(query, param, function (res, err) {
                    if (err) throw err
                    callback(res)
                })
            }

            const scheduleTask = function () {
                that.getTimeStamp(function (time) {
                    // logic
                    that.getQuery("SELECT * FROM test t WHERE t.name LIKE  '%?'", [3], function(result) {
                        for (let res of result) {
                            logger.info('name ' + res.name)
                            that.setTimeStamp(time++, function (res) {
                                logger.info(res++)
                            })
                        }
                       
                    })
                    
                })
            }

            this.intervalId = setInterval(scheduleTask, config.timerTask)

            return 'starting email service'
        }
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
            return 'email service stopped'
        } else {
            return 'email service not yet started'
        }
    }
}

module.exports = EmailService