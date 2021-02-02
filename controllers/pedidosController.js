const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async(req, res, next) => {
    try {
        const pedido = new Pedidos(req.body)
        await pedido.save()
        res.json({ mensaje: 'Pedido registrado exitosamente' })
    } catch (error) {
        res.json({ mensaje: 'Hubo un error' })
        next()
    }
}

exports.mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedidos)
    } catch (error) {
        res.json({ mensaje: 'Hubo un error' })
        next()
    }
}
exports.mostrarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)

    } catch (error) {
        res.json({ mensaje: 'Hubo un error, ese pedido no existe' })
        next()
    }
}
exports.actulizarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido }, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)
    } catch (error) {
        res.json({ mensaje: 'Hubo un error, ese pedido no existe' })
        next()
    }
}

exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete(req.params.idPedido)
        res.json({ mensaje: 'El pedido ha sido elimiado' })
    } catch (error) {
        res.json({ mensaje: 'Hubo un peo' })
        next()
    }
}