const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

//conectar mongo

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://yoneiker:yoneiker@cluster0-t41nx.mongodb.net/nodereact', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Initializations
const app = express()
app.set('port', process.env.PORT || 5000)

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Routes
app.use('/', routes())

//public files
app.use('/',express.static(path.join(__dirname, './build')));
app.use(express.static('uploads'))

// Server start :D
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})