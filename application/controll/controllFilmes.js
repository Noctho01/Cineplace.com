const filme = require('../model/Filmes')
const ingresso = require('../objetos/ingresso')

module.exports = {
    renderizarFilmesCartaz: async (req, res, next) => {
        try {
            const resultBuscaFilmes = await filme.todosOsFilmes()
            const resultBuscaCartaz = await filme.filmesCartaz()

            if (resultBuscaCartaz.error || resultBuscaFilmes.error) {
                let errorBusca = resultBuscaCartaz.error || resultBuscaFilmes.error
                let status = resultBuscaCartaz.status || resultBuscaFilmes.status
                res.redirect('/pagina_indisponivel')
                console.log({
                    error: 'Nao foi possivel prosseguir com a rota /home',
                    status: status,
                    motivo: errorBusca
                })
            } else {                
                res.render('home', { title: 'Cineplace.com', filmesMiniCartaz:  resultBuscaFilmes.body, filmesCartaz: resultBuscaCartaz.body })
                console.log(' - rota /home acessada - ')
            }
        } catch (err) {
            res.redirect('/pagina_indisponivel')
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
                res.redirect('/pagina_indisponivel')
                console.log({
                    error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme',
                    status: result.status,
                    motivo: result.error
                })
            } else {
                res.render('filme_ingresso', { filme: result.body })
                console.log(' - rota /filme/:nomeFilme acessada - ')
            }
        } catch (err) {
            res.redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme',
                motivo: err
            })
            next(err)
        }
    },

    renderizarSessao: async (req, res, next) => {
        try {
            const dia = req.query.dia
            const nomeFilme = req.params.nomeFilme
            const horario = req.query.horario
            const result = await filme.buscarFilme(nomeFilme)

            if(result.error) {
                res.redirect('/pagina_indisponivel')
                console.log({
                    error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme/sessao?',
                    status: result.status,
                    motivo: result.error
                })
            } else {
                res.render('selecionar_lugares', { filme: result.body, ingressoBody: { dia, horario }})
                console.log(' - rota /filme/:nomeFilme/sessao? - ')
            }
        } catch (err) {
            res.redirect('/pagina_indisponivel')
            console.log({
                error: 'Não foi possivel prosseguir com a rota /filme/:nomeFilme/sessao?',
                motivo: err
            })
            next(err)
        }
    },

    validarSelecaoLugares: async (req, res, next) => {
        try {
            console.log({
                sala: req.params.sala,
                cadeiras: req.body.cadeiras,
                ingresso: {
                    title: ingresso._titleFilme,
                    sessao: ingresso._sessao
                }
            })
        } catch (err) {
            next(err)
        }
    }
}