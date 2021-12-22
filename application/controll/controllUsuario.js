const usuario = require('../objetos/usuario')

module.exports = {
    renderizarFormularioCadastro: (req, res, next) => {
        res.render('cadastrar_usuario', { errors: false, usuario: false , status: 200})
    },

    fazerCadastro: async (req, res, next) => {
        try {
            const userDate = req.body
            const result = await usuario.criarUsuario(userDate)

            if (result.error) {
                if (result.status == 400) {
                    res.render('cadastrar_usuario', { errors: result.detalhes, usuario: result.body, status: result.status })
                    console.log(result.detalhes)
                } else if (result.status == 500) { 
                    res.render('cadastrar_usuario', { errors: false, usuario: false, status: result.status})
                    console.log(result.detalhes)
                }
            } else {
                res.send(result.detalhes)
                console.log(result.detalhes)
            }
        } catch (err) {
            next(err)
        }
    },

    renderizarFormularioLogin: (req, res, next) => {
        res.render('login_usuario', { error: false, email: false, })
    },

    efeturarLogin: async (req, res, next) => {
        try {
            const userDate = req.body
            const result = await usuario.acessarUsuario(userDate, res)
            if(!result.error) res.redirect('/pintao')
            console.log(result)
        } catch (err) {
            next(err)
        }
    }
}