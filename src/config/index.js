module.exports = {
  port: 3000,
  appName: 'node js is awesome',
  timeStampFile: './var/timeStamp.txt',
  timerTask: 500,
  mongo: {
    url: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost',
    db: 'awesomedb'
  },
  mysql: {
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "test_ci",
    connectionLimit: 10,
    debug: false
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
}
