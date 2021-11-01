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
  'process.env.jwtSecret':'Eco-Choice store kay! 167413ec-040f-45af-95e2-20fede0b7894',


  'process.env.EMAIL_NODEMAILER': 'maksdev01panel@gmail.com',
  'process.env.EMAIL_PASSWORD': 'Vfrcbv1996!',
  //'process.env.TELEGRAM_TOKEN': '2011610237:AAHhqAxePZ4RVZXIca0I0IjCjeoH-E3jm04',
  'process.env.TELEGRAM_TOKEN': '2065373657:AAFYPKjhGaKppVj4HpEPvqRby40Mpmuh0iQ',
  'process.env.TELEGRAM_CHAT_ID': '776918618'
}