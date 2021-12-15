require('dotenv').config()
const server = require('./application/config_server')

server.listen(process.env.PORT, () => {
	console.log(`Servidor iniciado em http://localhost:${process.env.PORT}`)
})