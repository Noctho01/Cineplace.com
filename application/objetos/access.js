const jwt = require('jsonwebtoken')
const crypto = require('crypto')

class Access {

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
 
    _gerarAssinatura (email) {
        return jwt.sign(email, process.env.SECRET)
    }

    salvarToken (res, email) {
        const token = this._gerarAssinatura(email)
        res.cookie('access-token', token)
    }

    validarToken (req) {
        const token = req.cookies['access-token']
        if(!token) return { error: true, status: 400 }
        
        const payload = jwt.verify(token, process.env.SECRET, (error, payload) => {
            if (error) {
                console.log('erro aqui')
                console.log(error)
                return { error: true, status: 500 }
            } else {
                return payload
            }
        })

        return { error: false, status: 200, body: payload }
    }

    deletarToken (res) {
        try {
            res.clearCookie('access-token')
            return { error: false, status: 200, detalhe: 'Token deletado' }
        } catch (err) {
            return { error: true, status: 500, detalhe: 'Token nao deletado' }
        }

    }
}

module.exports = new Access()