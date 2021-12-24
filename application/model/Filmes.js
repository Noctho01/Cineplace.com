const { conexao, db } = require('./connectionDb')

module.exports = {
    buscarFilme: async nomeFilme => {
        try {
            await conexao.connect()
            const resultFind = await db.collection('filmes').findOne({ title: nomeFilme })
            conexao.close()

            if(!resultFind) return { error: 'esse filme nao existe em nosso banco de dados', status: 500 }
            
            return { status: 200, body: resultFind }
            
        } catch (err) {
            return { error: 'acesso ao banco de dados de filmes indisponivel', status: 500}
        }
    },
    
    todosOsFilmes: async () => {
        try {
            await conexao.connect()
            const resultFind = await db.collection('filmes').find().toArray()
            conexao.close()

            if(resultFind.length == 0) return { error: 'Não foi possivel acessar o banco de dados "filmes"', status: 500 }
            return { status: 200, body: resultFind }

        } catch (err) {
            return { error: 'acesso ao banco de dados de filmes indisponivel', status: 500}
        }
    },

    filmesCartaz: async () => {
        await conexao.connect()
        const resultFind = await db.collection('filme_cartaz').find().toArray()
        conexao.close()

        if(resultFind.length == 0) return { error: 'Não foi possivel acessar o banco de dados "filme_cartaz"', status: 500}
        return { status: 200, body: resultFind }
    }
}