const dbFilmes = require('../model/dbFilmes')

class Filmes {
    constructor () {
        this._id = undefined
        this.title = undefined
        this.miniBanner_src = undefined
        this.resumo = undefined
        this.duracao = undefined
        this.genero = undefined
        this.diretor = undefined
        this.elenco = undefined
        this.classificacao = undefined
        this.distribuidora = undefined
        this.sala = undefined
        this.vendasLimite = undefined
        this.vendasTotal = undefined
        this.ingresso = undefined
    }

    async instanciarFilme (nomeFilme) {
        const resultBusca = await dbFilmes.buscarFilme(nomeFilme)

        if(resultBusca.error) console.error(resultBusca.error)
        this._setarPropriedadesFilme = resultBusca
    }

    async filmesCartaz () {
        return await dbFilmes.buscarFilmesCartaz()
    }

    async todosOsFilmes () {
        return await dbFilmes.buscarFilmes()
    }

    // INSTANCIANDO PROPRIEDADES DO FILME INSTANCIADO
    set _setarPropriedadesFilme (filme) {
        this.title = filme.title
        this.miniBanner_src = filme.miniBanner_src
        this.resumo = filme.resumo
        this.duracao = filme.duracao
        this.genero = filme.genero
        this.diretor = filme.diretor
        this.elenco = filme.elenco
        this.classificacao = filme.classificacao
        this.distribuidora = filme.distribuidora
        this.sala = filme.sala
        this.vendasLimite = filme.vendasLimite
        this.vendasTotal = filme.vendasTotal
        this.ingresso = filme.ingresso
    }
}

module.exports = Filmes