const expres = require('express')
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')
const testController = require('../controllers/testController')
const router = expres.Router()

//middleares para proteger rutas
const auth = require('../middlewares/auth')

module.exports = function() {
    // Criptomonedas
    router.get('/test', testController.test)
    router.get('/convert/:criptomoneda/to/:moneda', testController.test2)
    
    // add clients
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente)

    //view clients
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes)

    //specific client
    router.get('/clientes/:idCliente', 
        auth,
        clienteController.mostrarCliente)

    //update client
    router.put('/clientes/:idCliente', 
        auth,
        clienteController.actualizarCliente)

    //delete client
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente)

    // PRODUCTOS
    // add Products
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto)

    router.get('/productos',
        auth,
        productosController.mostrarProductos)

    router.get('/productos/:idProduct',
        auth,
        productosController.mostrarProducto)

    //search products
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto)

    router.put('/productos/:idProduct',
        auth,
        productosController.subirArchivo,
        productosController.editarProducto)

    router.delete('/productos/:idProduct',
        auth,
        productosController.eliminarProducto)

    // PEDIDOS
    router.post('/pedidos',
        auth,
        pedidosController.nuevoPedido)

    router.get('/pedidos',
        auth,
        pedidosController.mostrarPedidos)

    router.get('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarPedido)

    router.put('/pedidos/:idPedido',
        auth,
        pedidosController.actulizarPedido)

    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido)

    // USUARIOS
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    )
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    )
    return router
}