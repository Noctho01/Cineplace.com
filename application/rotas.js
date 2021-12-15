const pageFilmes = require('./controll/controllFilmes')

module.exports = app => {
	// HOME-PAGE /home
	app.route(['/home', '/'])
	.get(pageFilmes.renderizarFilmesCartaz)

	app.route('/diretor')
	.get(pageFilmes.renderizarFilme)
}