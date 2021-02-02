const Clientes = require('../models/Clientes')

//create cliente
exports.nuevoCliente = async(req, res) => {
    const cliente = new Clientes(req.body)
    try {
        //almacenamos el registro
        await cliente.save()
        res.json({ mensaje: 'Se agrego un nuevo cliente' })

    } catch (error) {
        res.send(error)
        next()
    }
}

//get clients
exports.mostrarClientes = async(req, res, next) => {
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch (error) {
        console.log(error);
        next()
    }
}

//get client 
exports.mostrarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente)
        res.json(cliente)
    } catch (error) {
        res.json({ mensaje: 'Ese cliente no existe' })
        next()
    }
}

//update client
exports.actualizarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente }, req.body, {
            new: true
        })
        res.json(cliente)
    } catch (error) {
        res.json({ mensaje: 'Hubo un peo' })
        next()
    }
}

//delete cliente
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete(req.params.idCliente)
        res.json({ mensaje: 'El cliente ha sido elimiado' })
    } catch (error) {
        res.json({ mensaje: 'Hubo un peo' })
        next()
    }
}