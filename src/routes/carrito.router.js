import { Router } from 'express'
import {getAllCarts, addCart, getCartByID, addProdsToCart, updateProductsQuantity,deleteProdsFromCart, emptyCartById} from '../controllers/carrito.controller.js';


const cartRouter = Router()


// get

cartRouter.get('/', getAllCarts);
cartRouter.get('/:cartId', getCartByID);

//post 

cartRouter.post('/', addCart)


//put

cartRouter.put('/:cartId', addProdsToCart)
cartRouter.put('/:cartId/products/:prodId', updateProductsQuantity)


//delete

cartRouter.delete('/:cartId/product/:prodId', deleteProdsFromCart);
cartRouter.delete('/:cartId', emptyCartById)



export default cartRouter