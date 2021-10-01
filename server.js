const express = require('express')
const next = require('next')
const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const rawResEnd = res.end
    const data = await new Promise((resolve) => {
      res.end = (payload) => {
        resolve(res.statusCode === 200 && payload)
      }
      app.render(req, res, req.path, {
        ...req.query,
        ...req.params,
      })
    })
    res.end = rawResEnd
    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => ssrCache({ req, res }))
  server.get('/products', (req, res) => ssrCache({ req, res }))
  server.get('/product', (req, res) => ssrCache({ req, res }))
  server.get('/about-us', (req, res) => ssrCache({ req, res }))
  server.get('/payement-and-delivery', (req, res) => ssrCache({ req, res }))
  server.get('/contacts', (req, res) => ssrCache({ req, res }))
  server.get('/basket', (req, res) => ssrCache({ req, res }))

  server.get('/AdminPanel/Account', (req, res) => ssrCache({ req, res }))
  server.get('/AdminPanel/Dashboard', (req, res) => ssrCache({ req, res }))
  server.get('/AdminPanel/Products', (req, res) => ssrCache({ req, res }))
  server.get('/AdminPanel/Settings', (req, res) => ssrCache({ req, res }))
  server.get('/AdminPanel/Top', (req, res) => ssrCache({ req, res }))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

})
.catch((ex) => {
	console.error(ex.stack)
	process.exit(1)
})

