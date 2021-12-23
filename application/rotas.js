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
		.get(pagesUsuario.renderizarFormularioCadastro)
		.post(pagesUsuario.fazerCadastro)

	app.route('/login')
		.get(pagesUsuario.renderizarFormularioLogin)
		.post(pagesUsuario.efeturarLogin)

	app.route('/perfil')
		.get(pagesUsuario.renderizarPerfil)

	app.route('/logout')
		.get(pagesUsuario.logout)
	
	app.route('/token_invalido')
		.get(pagesUsuario.tokenInvalido)
}