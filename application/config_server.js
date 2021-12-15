const express = require('express')

const app = express()

// configurando app
app.use(express.static('./application/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// configurando ejs
app.engine('html', require('ejs').renderFile)
app.set('views', './application/views')
app.set('view engine', 'html')

// adicionando rotas em consign app
require('./rotas')(app)

module.exports = app