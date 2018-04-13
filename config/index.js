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
    secret: 'secret',
    secret2: 'secret2'
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  isTest: true,
  reText: 'RE: '
}
