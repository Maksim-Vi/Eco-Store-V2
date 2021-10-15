
const express = require('express')
const cors = require('cors')
const route = require('./router/route')
const path = require('path')
const bodyParser = require('body-parser')

let port = process.env.PORT_SERVER || 8888

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
}))
app.use(bodyParser.json({
    limit: '50mb'
}));

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