
const express = require('express')
var cors = require('cors')
const BodyParser = require('body-parser')
const route = require('./router/route')
const path = require('path')

let port = process.env.PORT_SERVER || 8888

const app = express();

app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json());

app.use('/uploadsImages', express.static('uploadsImages'))
app.use('/uploadsDescImages', express.static('uploadsDescImages'))

app.use(cors())

route(app)

app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('access-control-allow-methods', 'PUT,POST,GET,DELETE,PATCH');
        return res.status(200).json('Option all good')
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})