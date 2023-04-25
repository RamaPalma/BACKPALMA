import { getProducts, addOne, getProdById, getProdByIdAndUpdate, getProdByIdAndDelete } from "../services/producto.services.js";
import {productoModel} from '../DAO/models/producto.model.js';

export async function getAllProducts(req,res){
    const {limit} = req.query
    const productos = await productoManager.getProduct(limit)
    
    if (!productos) {
        res.json({message:'Error'})
    } else {
        res.redirect('/views/producto')
    }
}

export async function getProductById(req, res) {
    try {
        const product = await getProdById(req.params.idProduct);
    if(product){
        res.json({ product });
    }else{
        res.send('Producto no encontrado')
    }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function AddOneProduct(req,res){
    try {
        const product = req.body
        const addNewProduct = await addOne(product)
        console.log(addNewProduct)
        res.json({ message: 'Producto agregado con exito', addNewProduct })
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function updateProdById(req, res) {
    const id = req.params.idProduct
    const obj = req.body
    try {
        const updateProd = await getProdByIdAndUpdate(id, obj)
        const updatedProd = await getProdById(id)
        if(updateProd){
            res.json({ message: 'Producto actualizado con exito', updatedProd })
        }else{
            res.json({message:"producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function deleteProdById(req, res) {
    const id = req.params.idProduct
    try {
        const deleteProd = await getProdByIdAndDelete(id)
        if(deleteProd){
            res.json({ message: 'Producto borrado con exito', deleteProd })
        }else{
            res.json({message:"producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}