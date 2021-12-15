const { client, db } = require('./connectionDb')

module.exports = {
    buscarFilme: async nomeFilme => {
        await client.connect()
        const resultFind = await db.collection('filmes').findOne({ title: nomeFilme })
        client.close()

        if(!resultFind) return { error: 'esse filme nao existe em nosso banco de dados' }
        return resultFind
    },
    
    buscarFilmes: async () => {
        await client.connect()
        const resultFind = await db.collection('filmes').find().toArray()
        client.close()

        if(resultFind.length == 0) return { error: 'Banco de dados esta vazio' }
        return resultFind
    },

    buscarFilmesCartaz: async () => {
        await client.connect()
        const resultFind = await db.collection('filme_cartaz').find().toArray()
        client.close()

        if(!resultFind) return { error: 'Banco de dados esta vazio' }
        return resultFind
    },

    buscarStatusIngressoFilme: async nomeFilme => {
        await client.connect()
        const resultFind = await db.collection('filmes').findOne({ title: nomeFilme })
        client.close()
        
        if(!resultFind) return { error: 'esse filme nao existe em nosso banco de dados' }

        const filter = {
            vendasTotal: resultFind.vendasTotal,
            ingresso: resultFind.ingresso
        }

        return filter
    }
}