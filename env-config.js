const prod = process.env.NODE_ENV === 'production'

module.exports = {
  // 'process.env.SERVER_URL': prod ? 'http://ecochoice.com.ua/api' : 'http://localhost:3000/api',
  // 'process.env.NEXT_PUBLIC_GA_ID':  prod ? 'UA-181335064-1' : '',

  //dev
  'process.env.SERVER_URL': 'http://localhost:4000/api',
  'process.env.NEXT_PUBLIC_GA_ID': '',
  'process.env.SERVER_UPLOAD_URL': 'http://localhost:8888',
  'process.env.PORT': 4000,
  'process.env.PORT_SERVER': 8888,

  'process.env.portDb': 4000,
  'process.env.MYSQL_HOST': 'localhost',
  'process.env.MYSQL_DATABASE': 'ecostore',
  'process.env.MYSQL_USERNAME': 'root',
  'process.env.MYSQL_PASSWORD': 'root',
  'process.env.jwtSecret':'',


  'process.env.EMAIL_NODEMAILER': '',
  'process.env.EMAIL_PASSWORD': '',
  'process.env.TELEGRAM_TOKEN': '',
  'process.env.TELEGRAM_CHAT_ID': ''
}
