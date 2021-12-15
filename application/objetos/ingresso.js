class Ingresso {
    constructor () {
        this._comprador = undefined
        this._titleFilme = undefined
        this._sala = undefined
        this._sessao = {
            dia: undefined,
            horario: undefined
        }
        this._cadeiras = undefined
        this._token = undefined
    }

    set setComprador (idComprador) {
        this._comprador = idComprador
    }

    set setTitleFilme (titleFilme) {
        this._titleFilme = titleFilme
    }

    set setSessao (diaHorario) {
        this._sessao.dia = diaHorario.dia
        this._sessao.horario = diaHorario.horario
        this._sala = diaHorario.sala
    }

    set setCadeiras (arrayCadeiras) {
        this._cadeiras = arrayCadeiras
    }

    resetPropriedades (validation) {
        if (validation) {
            this._comprador = undefined
            this._titleFilme = undefined
            this._sala = undefined
            this._sessao = {
                dia: undefined,
                horario: undefined
            }
            this._cadeiras = undefined
            this._token = undefined

            console.log({ status: 'success', descricao: 'Propriedades de ingresso foram resetadas' })

        } else {
            console.log({ status: 'failure', descricao: 'Reset nao autorizado' })
        }
    }

    gerarToken () {
        // codigo para gerar token
        console.log('token gerado...')
    }
}

module.exports = Ingresso