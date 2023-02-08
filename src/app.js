import express from "express"
import http from "http"
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js"
import cartsRouter from "./routes/carts.router.js"
import chatRouter from './routes/chat.router.js'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js"
import { Server } from "socket.io"
import mongoose from "mongoose"
import sessionRouter from './routes/session.router.js'
import session from "express-session"
import MongoStore from "connect-mongo"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const uri = "mongodb+srv://ValperAdmin:KC5jUZX-UkxdV9C@valper.bscvobk.mongodb.net/?retryWrites=true&w=majority"
const DB = 'Valper'
// Configurando el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: DB       
    }),
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}))


// Configuración de rutas

app.use('/api/products', productsRouter)
app.use('/session', sessionRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
app.use('/', viewsRouter)


// Conectando mongoose con Atlas e iniciando el servidor
mongoose.set('strictQuery', false)
mongoose.connect(uri, { dbName: DB }, error => {
    if(error) {
        console.log("Can't connect to the DB")
        return
    }

    console.log('DB connected')
    server.listen(8080, () => console.log('Listening on port 8080'))
    server.on('error', e => console.log(e))
})

export default io