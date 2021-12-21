//const dbUsuarios = require('../model/dbUsuario')
const validator = require('validator');
const dbUsuario = require('../model/dbUsuarios');
const crypto = require('crypto')

class Usuario {

    async criarUsuario (userDate) {
        const userDateFormatados = this._formatarUserDate(userDate)
        const resultValidation = await this._validarUserDateCadastro(userDateFormatados)
        const passwordInHashing = this._criptografarPassword(userDateFormatados.password)
        
        const userDateValidados = {
            nome: userDateFormatados.nome,
            email: userDateFormatados.email,
            password: passwordInHashing
        }
        
        
        for (let valor in resultValidation) {
            if(!resultValidation[valor]) return { error: true, status: 400, detalhes: resultValidation, body: userDateValidados}
        }
        
        const resulInsert = await dbUsuario.inserir(userDateValidados)
        if(!resulInsert) return { error: true, status: 500, detalhes: 'Não foi possivel criar usuario' }
        return { error: false, status: 200, detalhes: 'usuario criado com sucesso' }
    }

    acessarUsuario () {

    }

    configurarUsuario () {

    }

    async _validarUserDateCadastro (userDate) {
        // VALIDANDO NOME
        const nomeColado = userDate.nome.replace(/ /g, '')
        const nomeResult = validator.isAlpha(nomeColado,'pt-BR',) && !validator.isEmpty(userDate.nome)

        // VALIDANDO EMAIL
        const emailFree = await dbUsuario.usuarioExiste(userDate.email)
        const emailResult = !validator.isEmpty(userDate.email) && validator.isEmail(userDate.email) && emailFree

        // VALIDANDO SENHA
        const passwordResult = !validator.isEmpty(userDate.password) && validator.isLength(userDate.password, {min:5, max:20})
        const passwordCompResult = userDate.password === userDate.passwordComp && !validator.isEmpty(userDate.passwordComp)

        return { nome: nomeResult, email: emailResult, password: passwordResult, passwordComp: passwordCompResult }
    }

    _formatarUserDate (userDate) {
        const newUserDate = {}
        newUserDate.nome = validator.trim(userDate.nome).toUpperCase()
        newUserDate.email = validator.trim(userDate.email)
        newUserDate.password = validator.trim(userDate.password)
        newUserDate.passwordComp = validator.trim(userDate.passwordComp)

        return newUserDate
    }

    _criptografarPassword (password) {
        const hash = crypto.createHash('sha256', process.env.SECRET)
            .update(password)
            .digest('hex')

        return hash
    }



}

module.exports = new Usuario()