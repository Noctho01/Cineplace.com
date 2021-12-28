const filme = require('../model/Filmes')
const usuario = require('../objetos/usuario')

module.exports = {
    renderizarFilmesCartaz: async (req, res, next) => {
        try {
            const resultBuscaFilmes = await filme.todosOsFilmes()
            const resultBuscaCartaz = await filme.filmesCartaz()

            if (resultBuscaCartaz.error || resultBuscaFilmes.error) {
                let errorBusca = resultBuscaCartaz.error || resultBuscaFilmes.error
                let status = resultBuscaCartaz.status || resultBuscaFilmes.status
                res.status(404).redirect('/pagina_indisponivel')
                console.log({
                    error: 'Nao foi possivel prosseguir com a rota /home',
                    status: status,
                    motivo: errorBusca
                })
            } else {                
                res.status(200).render('home', { title: 'Cineplace.com', filmesMiniCartaz:  resultBuscaFilmes.body, filmesCartaz: resultBuscaCartaz.body })
                console.log(' - rota /home acessada - ')
            }
        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Nao foi possivel prosseguir com a rota /home',
                motivo: err
            })
            next(err)
        }
    },

    renderizarFilme: async (req, res, next) => {
        try {
            const nomeFilme = req.params.nomeFilme
            const result = await filme.buscarFilme(nomeFilme) // Instanciando filme 'nomeFilme'
            
            if (result.error) {
                res.status(404).redirect('/pagina_indisponivel')
                console.log({
                    error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme',
                    status: result.status,
                    motivo: result.error
                })
            } else {
                res.status(result.status).render('filme_ingresso', { filme: result.body })
                console.log(' - rota /filme/:nomeFilme acessada - ')
            }
        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme',
                motivo: err
            })
            next(err)
        }
    },

    renderizarSessao: async (req, res, next) => {
        try {
            const nomeFilme = req.params.nomeFilme
            const dia = req.query.dia
            const horario = req.query.horario
            const result = await filme.buscarFilme(nomeFilme)

            if(result.error) {
                res.status(404).redirect('/pagina_indisponivel')
                console.log({
                    error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme/sessao?',
                    status: result.status,
                    motivo: result.error
                })
            } else {
                res.status(result.status).render('selecionar_lugares', { filme: result.body, ingressoBody: { dia, horario }})
                console.log(' - rota /filme/:nomeFilme/sessao acessada - ')
            }
        } catch (err) {
            res.status(404).redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme/sessao?',
                motivo: err
            })
            next(err)
        }
    },

    validarSelecaoLugares: async (req, res, next) => {
        try {
            const produto = {
                nomeFilme: req.params.nomeFilme,
                cadeiras: req.body.cadeiras,
                sala: req.body.sala,
                sessao: {
                    dia: req.body.dia,
                    horario: req.body.horario
                }
            }
            const result = await usuario.liberarAcesso(req)

            if (result.error) {
                const scriptUrlRetorno = `window.location.href = "/login?upr=/filme/${produto.nomeFilme}/sessao?&dia=${produto.sessao.dia}&horario=${produto.sessao.horario}"`
                const scriptMensagemAlerta = 'window.alert("Você precisa esta logado para continuar a compra");'
                res.status(result.status).send(`<script> ${scriptMensagemAlerta}; ${scriptUrlRetorno} </script>`)
                console.log({
                    error: 'Não foi possivel acessar o servico de selecao de lugares',
                    status: result.status,
                    motivo: result.error
                })
            } else {
                // acessando rota de pagamento
                console.log(' - rota /pagamento acessada - ')
                res.cookie('dados-payment', { comprador: result.body, produto: produto } ).redirect('/pagamento')
            }
        } catch (err) {
            res.status(404).redirect('/servico_indisponivel')
            console.log({
                error: 'Não foi possivel acessar o servico de selecao de lugares',
                motivo: err
            })
            next(err)
        }
    }
}