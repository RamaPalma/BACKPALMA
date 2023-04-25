import express from 'express'
import  handlebars  from 'express-handlebars'
import { Server } from 'socket.io'
import { CarritoManager } from './DAO/carrito.js'
import { ProductManager } from './DAO/productos.js'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import  productosRouter  from './routes/productos.router.js'
import carritoRouter from './routes/carrito.router.js'
import sessionRouter from './routes/session.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import './DAO/dbConfig.js'
import session, { Cookie } from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import './passport/localPass.js'
import config from './config.js'


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//session
app.use(
    session({
        store : new MongoStore ({
            mongoUrl: 'mongodb+srv://ramiroP:ramiroP@cluster0.0zxay99.mongodb.net/productos?retryWrites=true&w=majority'
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie:{maxAge:60000}
    })
)

//passport
app.use(passport.initialize())

app.use(passport.session())

// routes
app.get('/',(req,res) => {
    res.redirect('/views/login')
})
app.use('/session',sessionRouter)
app.use('/views',viewsRouter)
app.use('/products',productosRouter)
app.use('/carts',carritoRouter)
app.use('/users',usersRouter)

const productManager = new ProductManager('productos.json')
const carritoManager = new CarritoManager('carrito.json')

// handlebarts
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views','./views')

const PORT = config.port

const httpServer = app.listen(PORT, ()=>{ 
    console.log(`escuchando al ${PORT}`)
} )

const socketServer =new Server(httpServer)