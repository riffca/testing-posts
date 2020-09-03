
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

let port = 3004
server.use(middlewares)
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})


server.use(router)
server.listen(port, () => {
	console.log('JSON Server is running on port ' + port)
})

