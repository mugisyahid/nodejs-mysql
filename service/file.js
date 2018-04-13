'use strict'

const fs = require('fs')
const logger = require('./logger')

class FileService {
    constructor() {
    }

    readFileSync(path, callback) {
        try {
            callback(fs.readFileSync(path, 'utf8'))
        } catch (err) {
            this.writeFile(path, '0', callback)
        }
    }

    writeFile(path, content, callback) {
        fs.writeFile(path, content, (error) => {
            if (error) throw error;
            callback(content)
        })
    }
}


module.exports = FileService