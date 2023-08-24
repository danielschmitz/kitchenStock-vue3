/* eslint-disable no-undef */
const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')
app.db = router.db

const rules = auth.rewriter({
  users: 600,
  categories: 640,
  stock: 640,
  products: 640
})

// expose json-server-auth
app.use('/api', rules)
app.use('/api', auth)
app.use('/api', router)

//expose vue to web root
app.static('dist')

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
app.listen(port)
console.log(`Express started! Port: ${port}`)