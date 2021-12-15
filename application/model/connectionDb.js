const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.URL_DATABASE)
const db = client.db(process.env.NAME_DATABASE)

module.exports = { client, db }