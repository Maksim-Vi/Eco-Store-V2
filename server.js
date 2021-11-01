const express = require('express')
const next = require('next')
const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 60, // 1hour
//   get: async ({ req, res }) => {
//     const rawResEnd = res.end
//     const data = await new Promise((resolve) => {
//       res.end = (payload) => {
//         resolve(res.statusCode === 200 && payload)
//       }
//       app.render(req, res, req.path, {
//         ...req.query,
//         ...req.params,
//       })
//     })
//     res.end = rawResEnd
//     return { data }
//   },
//   send: ({ data, res }) => res.send(data),
// })

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) =>  {
    return app.render(req, res, '/')
  })
  server.get('/products', (req, res) => {
    return app.render(req, res, '/products')
  })
  server.get('/product/:id', (req, res) => {
    return app.render(req, res, '/product', { id: req.params.id})
  })
  server.get('/about-us', (req, res) => {
    return app.render(req, res, '/about-us')
  })
  server.get('/payement-and-delivery', (req, res) =>  {
    return app.render(req, res, '/payement-and-delivery')
  })
  server.get('/contacts', (req, res) =>  {
    return app.render(req, res, '/contacts')
  })
  server.get('/basket', (req, res) =>  {
    return app.render(req, res, '/basket')
  })
  server.get('/reviews', (req, res) =>  {
    return app.render(req, res, '/reviews')
  })

  server.get('/AdminPanel/Dashboard', (req, res) => {
    return app.render(req, res, '/AdminPanel/Dashboard')
  })
  server.get('/AdminPanel/Products', (req, res) => {
    return app.render(req, res, '/AdminPanel/Products')
  })
  server.get('/AdminPanel/Settings', (req, res) => {
    return app.render(req, res, '/AdminPanel/Settings')
  })
  server.get('/AdminPanel/Top', (req, res) => {
    return app.render(req, res, '//AdminPanel/Top')
  })

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

