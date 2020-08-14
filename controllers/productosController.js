const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const { unlink } = require('fs-extra')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Formato no valido'))
        }
    }
}

//pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen')

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next()
    })
}

exports.nuevoProducto = async(req, res, next) => {
    const productos = new Productos(req.body)
    try {
        if (req.file.filename) {
            productos.imagen = req.file.filename
        }
        await productos.save()
        res.json({ mensaje: 'Se agrego un nuevo producto' })
    } catch (error) {
        console.log(error);
        next()
    }
}

//Muestra todos los productos
exports.mostrarProductos = async(req, res, next) => {
    try {
        const productos = await Productos.find({})
        res.json(productos)
    } catch (error) {
        console.log(error);
        next()
    }
}

exports.mostrarProducto = async(req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProduct)
        res.json(producto)
    } catch (error) {
        res.json({ mensaje: 'Ese mensaje no existe' })
        next()
    }
}

exports.eliminarProducto = async(req, res, next) => {
    try {
        const producto = await Productos.findByIdAndDelete(req.params.idProduct)
        await unlink(path.resolve('./uploads/' + producto.imagen))

        res.json({ mensaje: 'Producto eliminado exitosamente' })
    } catch (error) {
        res.json({ mensaje: 'Hubo un problema' })

        next()
    }
}

exports.editarProducto = async(req, res, next) => {
    try {
        let imagen = req.file || null
        var producto
        if (imagen) {
            //Eliminamos la imagen anterior
            const productoImagen = await Productos.findById(req.params.idProduct)
            await unlink(path.resolve('./uploads/' + productoImagen.imagen))

            //Guardamos en la db
            producto = await Productos.findOneAndUpdate({ _id: req.params.idProduct }, {
                nombre: req.body.nombre,
                precio: req.body.precio,
                imagen: imagen.filename
            }, {
                new: true
            })

        } else {
            producto = await Productos.findOneAndUpdate({ _id: req.params.idProduct }, {
                nombre: req.body.nombre,
                precio: req.body.precio
            }, {
                new: true
            })
        }

        res.json(producto)
    } catch (error) {
        console.log(error);
        
        res.json({ mensaje: 'Hubo un peo' })
        next()
    }
}

exports.buscarProducto = async(req, res) => {
    try {
        const {query} = req.params
        const producto = await Productos.find({nombre: new RegExp(query, 'i')})
        console.log(producto);
        

        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}
