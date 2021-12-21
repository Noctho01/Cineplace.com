const jwt = require('jsonwebtoken')
const crypto = require('crypto')

class Access {
    constructor (email) {
        this._email = email
    }

    _gerarHeader () {
        const header = JSON.stringify({
            alg: process.env.ALG,
            typ: process.env.TYP
        })

        const headerBase64 = Buffer.from(header)
            .toString('base64')
            .replace(/\//g)
            .replace(/\+/g)
            .replace(/=/g)

        return headerBase64
    }

    _gerarPayload () {
        const payload = JSON.stringify({
            "email" : this._email,
            "exp" : 1516239022
        })

        const payloadBase64 = Buffer.from(payload)
            .toString('base64')
            .replace(/\//g)
            .replace(/\+/g)
            .replace(/=/g)
        
        return payloadBase64
    }

    _gerarAssinatura () {
        const headerPayloadBase64 = this._gerarHeader() + '.' + this._gerarPayload()
        
        const signature = crypto
            .createHash('sha256', process.env.SECRET)
            .update(headerPayloadBase64)
            .digest('base64')

        const signatureUrl = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        
        const token = headerPayloadBase64 + '.' + signatureUrl
        
        return token
    }

    _salvarToken (res) {
        
    }

    validarCredenciais (credenciais) {

    }

    validarToken () {
        
    }
    

}

module.exports = Access