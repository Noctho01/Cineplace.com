const pagesFilme = require('./controll/controllFilmes')
const pagesUsuario = require('./controll/controllUsuario')

module.exports = app => {
	// HOME-PAGE /home
	app.route(['/home', '/'])
	.get(pagesFilme.renderizarFilmesCartaz)

	app.route('/filme/:nomeFilme')
	.get(pagesFilme.renderizarFilme)

	app.route('/ingresso/:sala/sessao')
	.get(pagesFilme.renderizarSessao)

	app.route('/cadastro')
	.get(pagesUsuario.renderizarFormulario)
	.post(pagesUsuario.fazerCadastro)
}