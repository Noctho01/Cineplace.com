const usuario = require('../objetos/usuario')

module.exports = {
    renderizarFormulario: (req, res, next) => {
        res.render('cadastrar_usuario', { errors: false, usuario: false , status: 200})
    },

    fazerCadastro: async (req, res, next) => {
        try {
            const userDate = req.body
            const result = await usuario.criarUsuario(userDate)

            if (result.error) {
                if(result.status == 400) res.render('cadastrar_usuario', { errors: result.detalhes, usuario: result.body, status: result.status })
                if(result.status == 500) res.render('cadastrar_usuario', { errors: false, usuario: false, status: result.status})
            } else {
                res.send('conta criada')
            }
        } catch (err) {
            next(err)
        }
    }
}