const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.SERVER_URL': prod ? 'http://ecochoice.com.ua/api' : 'http://localhost:3000/api',
  'process.env.NEXT_PUBLIC_GA_ID':  prod ? 'UA-181335064-1' : '',
  'process.env.PORT': prod ? 3000 : 3000,

  'process.env.portDb': 3000,
  'process.env.MYSQL_HOST': 'localhost',
  'process.env.MYSQL_DATABASE': 'ecostore',
  'process.env.MYSQL_USERNAME': 'root',
  'process.env.MYSQL_PASSWORD': 'root',
  'process.env.jwtSecret':'Eco-Choice store kay! 167413ec-040f-45af-95e2-20fede0b7894',

}