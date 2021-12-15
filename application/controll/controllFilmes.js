const Filmes = require('../objetos/filmes')
const Ingresso = require('../objetos/ingresso')

const filme = new Filmes()
const ingresso = new Ingresso()

module.exports = {
    renderizarFilmesCartaz: async (req, res, next) => {
        try {
            const hostname = req.hostname
            const ip = req.ip
            const resultBuscaFilmes = await filme.todosOsFilmes()
            const resultBuscaCartaz = await filme.filmesCartaz()

            if (resultBuscaCartaz.error) res.status(500).json(resultBuscaCartaz)
            else if (resultBuscaFilmes.error) res.status(500).json(resultBuscaFilmes)
            else res.render('home', { title: 'Cineplace.com', filmesMiniCartaz:  resultBuscaFilmes, filmesCartaz: resultBuscaCartaz})

            console.log(`Pagina "/home" foi acessada pelo client: ${hostname}:${ip}`)

            ingresso.resetPropriedades(true) // Resetando propriedades de ingresso

        } catch (err) {
            next(err)
        }
    },

    renderizarFilme: async (req, res, next) => {
        try {
            const hostname = req.hostname
            const ip = req.ip
            const nomeFilme = req.params.nomeFilme
            const resultInstancia = await filme.instanciarFilme(nomeFilme) // Instanciando filme 'nomeFilme'

            ingresso.setTitleFilme = nomeFilme // Setando o title do filme selecionado em ingresso._titleFilme
            
            if (resultInstancia.status != 'success') res.status(500).json(resultInstancia)
            else res.render('filme_ingresso', { filme })
            
            console.log(`Pagina "/filme/${filme.title}" foi acessada pelo client: ${hostname}:${ip}`)

        } catch (err) {
            next(err)
        }
    },

    renderizarSessao: async (req, res, next) => {
        try {
            await filme.atualizarSessao()
            const hostname = req.hostname
            const ip = req.ip
            const dia = req.query.dia
            const horario = req.query.horario
            const sala = req.params.sala

            ingresso.setSessao = {dia, horario , sala}
            res.render('selecionar_lugares', { filme, ingressoBody: { dia, horario }})

            console.log(`Pagina "/ingresso/${sala}/sessao" foi acessada pelo client: ${hostname}:${ip}`)

        } catch (err) {
            next(err)
        }
    }
}