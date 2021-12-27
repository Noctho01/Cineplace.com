const pagesFilme = require('./controll/controllFilmes')
const pagesUsuario = require('./controll/controllUsuario')

module.exports = app => {
	// >>>> SERVICO DE COMPRA INGRESSO <<<<
	// HOME-PAGE /home
	app.route(['/home', '/'])
		.get(pagesFilme.renderizarFilmesCartaz)

	// PAGINA DO FILME (SELECIONAR SESSAO)
	app.route('/filme/:nomeFilme')
		.get(pagesFilme.renderizarFilme)

	//	PAGINA DO FILME (SELESSAO DE LUGARES)
	app.route('/filme/:nomeFilme/sessao')
		.get(pagesFilme.renderizarSessao)
		.post(pagesFilme.validarSelecaoLugares)

	// >>>> SERVICO DE USUARIOS <<<<
	//	- cadastrar usuarios -
	app.route('/cadastro')
		.get(pagesUsuario.renderizarFormularioCadastro)
		.post(pagesUsuario.fazerCadastro)

	//	- login de usuarios -
	app.route('/login?')
		.get(pagesUsuario.renderizarFormularioLogin)
		.post(pagesUsuario.efeturarLogin)

	//	- acesso ao perfil do usuario
	app.route('/perfil')
		.get(pagesUsuario.renderizarPerfil)

	//	- logou do acesso ao usuario
	app.route('/logout')
		.get(pagesUsuario.logout)
	
	//	- token invalido - 
	app.route('/token_invalido')
	.get(pagesUsuario.tokenInvalido)

	// >>>> SERVICO DE PAGAMENTO <<<<
	// - pagina de validar usuario -
	
	//	>>>> TRATAMENTO DE ERROS <<<<
	// - pagina indisponivel -
	app.route('/pagina_indisponivel')
		.get((req, res) => res.render('pagina_indisponivel') || res.send('pagina indisponivel') )
	
	// - servico indisponivel -
	app.route('/servico_indisponivel')
		.get((req, res) => res.render('servico_indisponivel') || res.send('servico indisponivel') )
}