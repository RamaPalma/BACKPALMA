import express from 'express'
import { CarritoManager } from './carrito.js'
import { ProductManager } from './productos.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const productManager = new ProductManager('productos.json')
const carritoManager = new CarritoManager('carrito.json')

//ESTRUCTURA PRODUCTO PARA POST
/*
{
    "title": "titulo3",
    "description": "descripcion3",
    "price": 300,
    "thumbnail": "miniatura3",
    "code": "codigo3",
    "stock": 3
}
*/

//PRODUCTOS
app.get('/products',async(req,res)=>{ 
    const {limit} = req.query
    const productos = await productManager.getProduct(limit || 'max')
    res.json({productos})
})

app.get('/products/:pid',async(req,res)=>{ 
    const {pid} = req.params
    const producto = await productManager.getProductById(pid)
    res.json({producto})
})

app.post('/products',async(req,res)=>{ 
    const objeto = req.body
    await productManager.addProduct(objeto)
    res.json({message:"PRODUCTO AGREGADO"})
})

app.put('/products/:pid',async(req,res)=>{ 
    const {pid} = req.params
    const objeto = req.body
    await productManager.updateProduct(objeto,parseInt(pid))
    res.json({message:"PRODUCTO MODIFICADO"})
})

app.delete('/products/:pid',async(req,res)=>{ 
    const {pid} = req.params
    await productManager.deleteProduct(parseInt(pid))
    res.json({message:"PRODUCTO ELIMINADO"})
})

//ESTRUCTURA CARRITO PARA POST
/*
{
    id:1,
    productos:  [
    {
        "id": 1,
        "quantity":3
    }
    {
        "id": 2,
        "quantity":3
    }
                ]
}
*/


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

app.listen(PORT, ()=>{ 
    console.log(`escuchando al ${PORT}`)
} )
