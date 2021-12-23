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
        res.render('login_usuario', { error: false})
    },

    efeturarLogin: async (req, res, next) => {
        try {
            const userDate = req.body
            const result = await usuario.acessarUsuario(userDate, res)
            if(result.error) res.render('login_usuario', { error: true, detalhe: result.detalhe, tipo: result.tipo })
            res.redirect('/perfil')
        } catch (err) {
            next(err)
        }
    },

    renderizarPerfil: async (req, res, next) => {
        try {
            const acessoLiberado = await usuario.liberarAcesso(req)
            if(acessoLiberado.error && acessoLiberado.status == 400) res.redirect('/token_invalido')
            if(acessoLiberado.error && acessoLiberado.status == 500) res.redirect('/login')
            
            res.render('perfil_usuario', { title: acessoLiberado.body.nome, usuario: acessoLiberado.body })
        } catch (err) {
            next(err)
        }
    },

    logout: (req, res, next) => {
        try {
            const result = usuario.encerrarSessao(res)
            if(result.error) res.send(result.detalhe)
            console.log(result.detalhe)
            res.redirect('/login')
        } catch (err) {
            next(err)
        }
    },

    tokenInvalido: (req, res, next) => {
        try {
            res.send('<strong>Voce precisa fazer login para acessar este servico</strong><br><a href="/login">Fazer Login</a> ou <a href="/cadastro">Fazer Cadastro</a>')
        } catch (err) {
            next(err)
        }
    }
}