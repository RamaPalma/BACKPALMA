import mongoose from "mongoose";
import {Router} from "express";
import ProductoManager from "../productosMongo.js";

const productoManager = new ProductoManager()

const router = Router()

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
//TRAER TODOS LOS PRODUCTOS
router.get('/',async(req,res)=>{
    const {limit} = req.query
    const productos = await productoManager.getProduct(limit)
    
    if (!productos) {
        res.json({message:'Error'})
    } else {
        res.redirect('/views/producto')
    }
})

//TRAER POR ID
router.get('/:pid',async(req,res)=>{ 
    const {pid} = req.params
    const producto = await productoManager.getProductById(pid)
    if(producto){
        res.json({message:'Encontrado', producto: producto})
    }else{
        res.json({message:'producto no encontrado'})
    }
    
})

//AGREGAR PRODUCTO
router.post('/',async(req,res)=>{
    const {title,description,price,thumbnail,code,stock} = req.body
    if (!title || !description  || !price  || !thumbnail ||  !code || !stock) {
        res.json({message:'valores requeridos'})
    } else {
        const nuevoProducto = await productoManager.addProduct({title,description,price,thumbnail,code,stock})
        if (!nuevoProducto) {
            res.json({message:'Error'})
        } else {
            res.json({message:'creado', producto: nuevoProducto})
        }
    }
})

//ELIMINAR PRODUCTO
router.delete('/:pid',async(req,res)=>{
    const {pid} = req.params
    await productoManager.deleteProduct(pid)
    res.json({message:"PRODUCTO ELIMINADO"})
})

//ACTUALIZAR PRODUCTO
router.put('/:pid',async(req,res)=>{ 
    const {pid} = req.params
    const objeto = req.body
    await productoManager.updateProduct(objeto,pid)
    res.json({message:"PRODUCTO MODIFICADO"})
})

export default router