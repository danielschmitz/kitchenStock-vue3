/* eslint-disable no-undef */
const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

const rules = auth.rewriter({
  users: 600,
  categories: 640,
  stock: 640,
  products: 640
})

// You must apply the middlewares in the following order
app.use(rules)

// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
app.listen(port)
console.log(`Express started! Port: ${port}`)