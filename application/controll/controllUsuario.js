const usuario = require('../objetos/usuario')

module.exports = {
    renderizarFormularioCadastro: (req, res, next) => {
        try {
            res.status(200).render('cadastrar_usuario', { errors: false, usuario: false , status: 200})
            console.log(' - rota /cadastro acessada - ')

        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel acessar o formulario de cadastro de usuarios',
                motivo: err
            })
            next(err)
        }
    },

    fazerCadastro: async (req, res, next) => {
        try {
            const userDate = req.body
            const result = await usuario.criarUsuario(userDate)

            if (result.error) {
                if (result.status == 400) {
                    res.status(result.status).render('cadastrar_usuario', { errors: result.detalhes, usuario: result.body, status: result.status })
                    console.log({
                        error: ` x não foi possivel cadastrar usuario x `,
                        status: result.status,
                        motivo: result.error
                    })
                } else if (result.status == 500) { 
                    res.status(result.status).render('cadastrar_usuario', { errors: false, usuario: false, status: result.status})
                    console.log({
                        error: ` x não foi possivel cadastrar usuario x `,
                        status: result.status,
                        motivo: result.error
                    })
                }
            } else {
                res.status(result.status).redirect('/cadastro_sucesso')
                console.log(` - ${result.detalhes} - `)
            }
            
        } catch (err) {
            res.status(404).redirect('/servico_indisponivel')
            console.log({
                error: 'Não foi possivel efetuar o cadastro de usuario',
                motivo: err
            })
            next(err)
        }
    },

    renderizarFormularioLogin: (req, res, next) => {
        try {
            const url = req.query.upr
            let urlParaRetorno

            if (!req.query.dia) urlParaRetorno = url
            else urlParaRetorno = url + '&dia=' + req.query.dia + '&horario=' + req.query.horario

            res.status(200).render('login_usuario', { error: false, upr: urlParaRetorno })
            console.log(' - rota /login acessada - ')

        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel acessar o formulario de login de usuario',
                motivo: err
            })
            next(err)
        }
    },

    efeturarLogin: async (req, res, next) => {
        try {
            const url = req.query.upr
            let urlParaRetorno

            if (!req.query.dia) urlParaRetorno = url
            else urlParaRetorno = url + 'dia=' + req.query.dia + '&horario=' + req.query.horario 

            const userDate = req.body
            const result = await usuario.acessarUsuario(userDate, res)

            if (result.error) {
                res.status(result.status).render('login_usuario', { error: true, detalhe: result.error, tipo: result.tipo, upr: urlParaRetorno })
            } else {
                res.status(200).redirect(urlParaRetorno)
                console.log(` - ${result.detalhes} - `)
            }

        } catch (err) {
            res.status(404).redirect('/servico_indisponivel')
            console.log({
                error: 'Não foi possivel efetuar o login do usuario',
                motivo: err
            })
            next(err)
        }
    },

    renderizarPerfil: async (req, res, next) => {
        try {
            const acessoLiberado = await usuario.liberarAcesso(req)
            if (acessoLiberado.error && acessoLiberado.status == 400) res.status(acessoLiberado.status).redirect('/token_invalido')
            else if (acessoLiberado.error && acessoLiberado.status == 500) res.status(acessoLiberado.status).redirect('/login?upr=/perfil')
            else res.status(acessoLiberado.status).render('perfil_usuario', { title: acessoLiberado.body.nome, usuario: acessoLiberado.body })

        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel acessar a pagina de perfil',
                motivo: err
            })
            next(err)
        }
    },

    logout: (req, res, next) => {
        try {
            const result = usuario.encerrarSessao(res)

            if (result.error) {
                res.status(result.status).send(result.detalhe)
            } else {
                console.log(result.detalhe)
                res.redirect('/perfil')
            }

        } catch (err) {
            res.redirect('/servico_indisponivel')
            console.log({
                error: 'Não foi possivel completar o logout do usuario',
                motivo: err
            })
            next(err)
        }
    },

    tokenInvalido: (req, res, next) => {
        try {
            res.send('<strong>Voce precisa fazer login para acessar este servico</strong><br><a href="/login?upr=/perfil">Fazer Login</a> ou <a href="/cadastro">Fazer Cadastro</a>')
            console.log(' x Token Invalido x ')
            
        } catch (err) {
            res.status(404).redirect('/servico_indisponivel')
            console.log({
                error: 'Nãq foi possivel acessar pagina de token invalido',
                motivo: err
            })
            next(err)
        }
    }
}