const pageFilmes = require('./controll/controllFilmes')

module.exports = app => {
	// HOME-PAGE /home
	app.route(['/home', '/'])
	.get(pageFilmes.renderizarFilmesCartaz)

	app.route('/filme/:nomeFilme')
	.get(pageFilmes.renderizarFilme)

	app.route('/ingresso/:sala/sessao')
	.get(pageFilmes.renderizarSessao)
}