import express from 'express'
import { ProductManager } from './productos.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const productManager = new ProductManager('productos.json')

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




const PORT = 8080

app.listen(PORT, ()=>{ 
    console.log(`escuchando al ${PORT}`)
} )
