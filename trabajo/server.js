import fs from 'fs'
import express from 'express'
import  handlebars  from 'express-handlebars'
import { Server } from 'socket.io'
import { CarritoManager } from './carrito.js'
import { ProductManager } from './productos.js'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import productosRouter from './routes/productos.router.js'
import carritoRouter from './routes/carrito.router.js'
import './dbConfig.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/products',productosRouter)
app.use('/carts',carritoRouter)

const productManager = new ProductManager('productos.json')
const carritoManager = new CarritoManager('carrito.json')

app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views','./views')


//CARRITO
app.post('/carts',async(req,res)=>{ 
    const objeto = req.body
    await carritoManager.addCarrito(objeto)
    res.json({message:"CARRITO AGREGADO"})
})

app.get('/carts/:cid',async(req,res)=>{ 
    const {cid} = req.params
    const carrito  = await carritoManager.getCarritoById(parseInt(cid))
    res.json({carrito})
})

/*
app.post('/carts/:cid/product/:pid',async(req,res)=> {
        const {cid , pid}  = req.params

        const carritos = await carritoManager.getCarrito()

        const producto = await productManager.getProductById(parseInt(pid))
        const carrito = await carritoManager.getCarritoById(parseInt(cid))

        carrito.productos[0].quantity++

        

        JSON.stringify(carritos)

    });    

*/

const PORT = 8080

const httpServer = app.listen(PORT, ()=>{ 
    console.log(`escuchando al ${PORT}`)
} )

const socketServer =new Server(httpServer)