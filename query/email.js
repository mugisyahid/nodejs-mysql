'use strict'

const config = require('../config')
const logger = require('../service/logger')
const db = require('../service/db')

exports.getNewMail = function(timestamp, callback) {
   db("SELECT *, "
   + "id AS timestamp "
   + "from mail_master mm "
   + "where id > " + timestamp + " "
   + "ORDER BY id ASC", callback)
}


exports.getTemplate = function(callback) {
    db("SELECT * FROM mail_autoreply_template", callback)
 }