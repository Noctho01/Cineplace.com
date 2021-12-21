const { conexao, db } = require('./connectionDb')

module.exports = {
    buscarFilme: async nomeFilme => {
        await conexao.connect()
        const resultFind = await db.collection('filmes').findOne({ title: nomeFilme })
        conexao.close()

        if(!resultFind) return { error: 'esse filme nao existe em nosso banco de dados' }
        return resultFind
    },
    
    buscarFilmes: async () => {
        await conexao.connect()
        const resultFind = await db.collection('filmes').find().toArray()
        conexao.close()

        if(resultFind.length == 0) return { error: 'Banco de dados esta vazio' }
        return resultFind
    },

    buscarFilmesCartaz: async () => {
        await conexao.connect()
        const resultFind = await db.collection('filme_cartaz').find().toArray()
        conexao.close()

        if(!resultFind) return { error: 'Banco de dados esta vazio' }
        return resultFind
    },

    buscarStatusIngressoFilme: async nomeFilme => {
        await conexao.connect()
        const resultFind = await db.collection('filmes').findOne({ title: nomeFilme })
        conexao.close()
        
        if(!resultFind) return { error: 'esse filme nao existe em nosso banco de dados' }

        const filter = {
            vendasTotal: resultFind.vendasTotal,
            ingresso: resultFind.ingresso
        }

        return filter
    }
}