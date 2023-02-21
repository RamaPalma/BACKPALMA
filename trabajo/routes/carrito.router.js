import mongoose from "mongoose";
import {Router} from "express";
import  CarritoManager  from "../carritoMongo.js";

const carritoManager = new CarritoManager()
const router = Router()

//ESTRUCTURA CARRITO PARA POST
/*
{
    "productos":  [
    {
        "id": "63f53a579250faba02f2e3c4",
        "quantity":3
    },
    {
        "id": "63f546e85e493923fa25fa0e",
        "quantity":3
    }
                ]
}
*/

//CARRITO
router.post('/',async(req,res)=>{ 
    const objeto = req.body
    await carritoManager.addCarrito(objeto)
    res.json({message:"CARRITO AGREGADO"})
})

export default router