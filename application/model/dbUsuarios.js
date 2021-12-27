const { conexao, db } = require('./connectionDb')

module.exports = {
    inserir: async (credenciais) => {
        try {
            await conexao.connect()
            const resulfInsert = await db.collection('usuarios').insertOne(credenciais)
            conexao.close()

            return resulfInsert.acknowledged
        } catch (err) {
            return false
        }
    },

    buscar: async (email, projecao) => {
        try {
            await conexao.connect()
            const resultFind = await db.collection('usuarios').findOne({email: email}, {projection: projecao})
            conexao.close()

            if (!resultFind) return false
            return resultFind
        } catch (err) {
            console.error(err)
            return false
        }

    },

    buscarEspecifica: async  email => {
        try {
            await conexao.connect()
            const resultFind = await db.collection('usuarios').findOne({ email: email }, {projection: { nome: 1 } })
            conexao.close()

            return resultFind

        } catch (err) {
            console.error(err)
        }
    },

    alterar: async (email, alteracao) => {

    },

    usuarioExiste: async email => {
        await conexao.connect()
        const resultFind = await db.collection('usuarios').findOne({ email: email })
        conexao.close()

        return resultFind == null ? false : true
    }
}