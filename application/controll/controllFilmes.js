const Filmes = require('../objetos/filmes')
const filme = new Filmes()

module.exports = {
    renderizarFilmesCartaz: async (req, res, next) => {
        try {
            const resultBuscaFilmes = await filme.todosOsFilmes()
            const resultBuscaCartaz = await filme.filmesCartaz()
            
            if(resultBuscaFilmes.error) res.status(500).json({ error: resultBusca.error })
            if(resultBuscaCartaz.error) res.status(500).json({ error: resultBusca.error })

            res.render('home', { title: 'Cineplace.com', filmesMiniCartaz:  resultBuscaFilmes, filmesCartaz: resultBuscaCartaz})
        } catch (err) {
            next(err)
        }
    },

    renderizarFilme: async (req, res, next) => {
        console.log(await filme.diretor)
    }
}