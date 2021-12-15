const Filmes = require('../objetos/filmes')
const filme = new Filmes()

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
            
            if (resultInstancia.status != 'success') res.status(500).json(resultInstancia)
            else res.render('filme_ingresso', { filme })
            
            console.log(`Pagina "/filme_ingresso/${filme.title}" foi acessada pelo client: ${hostname}:${ip}`)

        } catch (err) {
            next(err)
        }
    }
}