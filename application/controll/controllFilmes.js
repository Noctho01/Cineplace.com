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
            
            console.log(`Pagina "/filme_ingresso/${filme.title}" foi acessada pelo client: ${hostname}:${ip}`)

        } catch (err) {
            next(err)
        }
    },

    renderizarSessao: async (req, res, next) => {
        try {
            res.send('Ola Mundo')
        } catch (err) {
            next(err)
        }
    }
}