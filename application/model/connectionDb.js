const { MongoClient } = require('mongodb')

const conexao = new MongoClient(process.env.URL_DATABASE)
const db = conexao.db(process.env.NAME_DATABASE)

module.exports = { conexao, db }