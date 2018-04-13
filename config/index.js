module.exports = {
  port: 3000,
  appName: 'node js is awesome',
  timeStampFile: './var/timeStamp.txt',
  timerTask: 1000,
  mailFrom: 'cs_dev@awesome_company.co.id',
  mongo: {
    url: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost',
    db: 'awesomedb'
  },
  mysql: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "",
    connectionLimit: 10,
    debug: false
  },
  sendgrid: {
    secret: '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',
    secret2: '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'
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  isTest: true,
  reText: 'RE: '
}
