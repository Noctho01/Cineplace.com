//const dbUsuarios = require('../model/dbUsuario')
const validator = require('validator');
const dbUsuario = require('../model/dbUsuarios');
const access = require('./access')
const crypto = require('crypto');

class Usuario {

    async criarUsuario (userDate) {
        try {    
            const userDateFormatados = this._formatarUserDate(userDate)
            const resultValidation = await this._validarUserDateCadastro(userDateFormatados)
            const passwordInHashing = this._criptografarPassword(userDateFormatados.password)
            
            const userDateValidados = {
                nome: userDateFormatados.nome,
                email: userDateFormatados.email,
                password: passwordInHashing
            }
            
            for (let valor in resultValidation) {
                if(!resultValidation[valor]) return { error: true, status: 400, detalhes: resultValidation, body: userDateFormatados}
            }
            
            const resulInsert = await dbUsuario.inserir(userDateValidados)
            if(!resulInsert) return { error: true, status: 500, detalhes: 'Não foi possivel criar usuario' }
            return { error: false, status: 200, detalhes: 'usuario criado com sucesso' }
        } catch (err) {
            console.error(err)
            return { error: true, status: 500, detalhes: 'Não foi possivel criar usuario' }
        }
    }

    async acessarUsuario (userDate, res) {
        try {
            const existe = await dbUsuario.usuarioExiste(userDate.email)
            if(!existe) return { error: true, status: 400, detalhe: 'email incorreto', tipo: 'email'}
            
            const passwordValido = await this._validarPassword(userDate)
            if(!passwordValido) return { error: true, status: 400, detalhe: 'senha incorreta', tipo: 'password' }

            this._gerarToken(res, userDate.email)

            return { error: false, status: 200, detalhe: 'login aprovado'}
            
        } catch (err) {
            return { error: true, status: 500, detalhes: err, tipo: 'geral'}
        }
    }

    configurarUsuario () {

    }

    // ====================================================================================================================================================
    async _validarUserDateCadastro (userDate) {
        // VALIDANDO NOME
        const nomeColado = userDate.nome.replace(/ /g, '')
        const nomeResult = validator.isAlpha(nomeColado,'pt-BR',) && !validator.isEmpty(userDate.nome)

        // VALIDANDO EMAIL
        const emailFree = await dbUsuario.usuarioExiste(userDate.email)
        const emailResult = !validator.isEmpty(userDate.email) && validator.isEmail(userDate.email) && !emailFree

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

    _gerarToken (res, email) {
        access.salvarToken(res, email)
    }

    async _validarPassword (userDate) {
        const passwordHashing = this._criptografarPassword(userDate.password)
        const result = await dbUsuario.buscar(userDate.email)
        
        if(!result) return false
        if(result.password == passwordHashing) return true
        return false
    }

    _criptografarPassword (password) {
        const hash = crypto.createHash('sha256', process.env.SECRET)
            .update(password)
            .digest('hex')

        return hash
    }
}

module.exports = new Usuario()