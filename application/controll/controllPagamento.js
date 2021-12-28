const MercadoPago = require('mercadopago')
const Ingresso = require('../objetos/ingresso')
const usuario = require('../objetos/usuario')

async function paymentFunction (usuario, ingresso) {
    MercadoPago.configure({
        sandbox: true,
        access_token: process.env.ACCESS_TOKEN
    })

    const payer = {
        name: usuario.nome,
        email: usuario.email,
    }
    const item = {
        id: ingresso.id,
        title: `${ingresso.nomeFilme}`,
        currency_id: 'BRL',
        description: `Ingresso para o filme ${ingresso.nomeFilme}`,
        category_id: 'entertainment',
        quantity: ingresso.cadeiras.length,
        unit_price: parseFloat(process.env.PRICE_TICKET)
        
    }
    const payment_methods = {
        excluded_payment_types: [{id: 'digital_currency'}],
        installments: 8,
    }
    const back_urls = {
        success: 'localhost:3232/pagamentoSuccess?',
        failure: '',
        pending: '',
    }
    const preferencias = {
        items: [item],
        payer,
        payment_methods,
        back_urls,
        statement_descriptor: `CINEPLACE.COM`,
    }

    return MercadoPago.preferences.create(preferencias)
}

module.exports = {
    iniciarPagamento: async (req, res, next) => {
        const comprador = req.cookies['dados-payment'].comprador
        const produto = req.cookies['dados-payment'].produto
        const ingresso = new Ingresso(produto, comprador)
        const result = await paymentFunction(comprador, ingresso)
        
        res.redirect(result.body.init_point)
    },

    success: async (req, res, next) => {
        const comprador = req.cookies['dados-payment'].comprador
        const produto = req.cookies['dados-payment'].produtonce
        const ingresso = new Ingresso(produto, comprador)
        const idPagamento = req.query.payment_id

        const ingressoValido = ingresso.validar(idPagamento)
        console.log(ingressoValido)
        //usuario.recebeIngresso(ingressoValido)

    }
}