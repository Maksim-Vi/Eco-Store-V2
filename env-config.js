const prod = process.env.NODE_ENV === 'production'

module.exports = {
  //'process.env.SERVER_URL': prod ? 'http://ecochoice.com.ua/api' : 'http://localhost:3000/api',  PROD
  //'process.env.NEXT_PUBLIC_GA_ID':  prod ? 'UA-181335064-1' : '', PROD

  //dev
  'process.env.SERVER_URL': prod ? 'http://localhost:3000/api' : 'http://localhost:3000/api',
  'process.env.SERVER_UPLOAD_URL' : prod ? 'http://localhost:8888' : 'http://localhost:8888',
  'process.env.NEXT_PUBLIC_GA_ID':  prod ? '' : '',
  'process.env.PORT': prod ? 3000 : 3000,
  'process.env.PORT_SERVER': prod ? 8888 : 8888,

  'process.env.portDb': 3000,
  'process.env.MYSQL_HOST': 'localhost',
  'process.env.MYSQL_DATABASE': 'ecostore',
  'process.env.MYSQL_USERNAME': 'root',
  'process.env.MYSQL_PASSWORD': 'root',
  'process.env.jwtSecret':'Eco-Choice store kay! 167413ec-040f-45af-95e2-20fede0b7894',


  'process.env.EMAIL_NODEMAILER': prod ? 'maksdev01panel@gmail.com' : 'maksdev01panel@gmail.com',
  'process.env.EMAIL_PASSWORD':  prod ? 'Vfrcbv1996!' : 'Vfrcbv1996!',
  // 'process.env.TELEGRAM_TOKEN': '2011610237:AAHhqAxePZ4RVZXIca0I0IjCjeoH-E3jm04'
  'process.env.TELEGRAM_TOKEN': '2065373657:AAFYPKjhGaKppVj4HpEPvqRby40Mpmuh0iQ',
  'process.env.TELEGRAM_CHAT_ID': '776918618'
}