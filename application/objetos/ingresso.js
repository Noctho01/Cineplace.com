const { createHmac } = require('crypto')

class Ingresso {
    constructor (produto, comprador) {
        //this._comprador = comprador.nome
        this._titleFilme = produto.nomeFilme
        this._sala = produto.sala
        this._sessao = {
            dia: produto.sessao.dia,
            horario: produto.sessao.horario
        }
        this._cadeiras = produto.cadeiras
    }

    get nomeFilme () {
        return this._titleFilme
    }

    get sessao () {
        return `${this._sessao.dia} - ${this._sessao.horario}`
    }

    get cadeiras () {
        return this._cadeiras
    }

    get sala () {
        return this._sala
    }

    validar (id) {
        return {
            comprador: this._comprador,
            nomeFilme: this.nomeFilme,
            sala: this.sala,
            sessao: this.sessao,
            cadeiras: this.cadeiras,
            codigo: this._gerarToken(id)
        }
    }

    _gerarToken (id) {
        return createHmac('sha256', process.env.SECRET_KEY_INGRESSO).update(id).digest('hex')
    }
}

module.exports = Ingresso