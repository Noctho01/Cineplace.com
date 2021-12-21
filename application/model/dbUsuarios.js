const { conexao, db } = require('./connectionDb')

module.exports = {
    inserir: async (credenciais) => {
        try {
            await conexao.connect()
            const resulfInsert = await db.collection('usuarios').insert(credenciais)
            conexao.close()

            return resulfInsert.acknowledged
        } catch (err) {
            console.error(err)
            return false
        }
            
    },

    buscar: async email => {

    },

    alterar: async (email, alteracao) => {

    },

    usuarioExiste: async email => {
        await conexao.connect()
        const resultFind = await db.collection('usuarios').findOne({ email: email })
        conexao.close()

        return resultFind != null ? false : true
    }
}