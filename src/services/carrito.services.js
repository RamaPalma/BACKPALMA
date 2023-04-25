import  CarritoManager  from "../DAO/carritoMongo.js";

const carritoManager = new CarritoManager()

export async function getCarts(){
    try {
        const carts = await carritoManager.findAll()
        return carts
    } catch (error) {
        return error
    }
}

export async function addOne(obj){
    try {
        const newCart = await carritoManager.addCart(obj)
        return newCart
    } catch (error) {
        console.log(error)
    }
}

export async function getCartById(id){
    try {
        const product = await carritoManager.findCartById(id)
        return product
    } catch (error) {
        return error
    }
}

export async function addProdToCart(id, idProduct){
    try {
        const cart = await carritoManager.addProdToCart(id, idProduct)
        return cart
    } catch (error) {
        return error
    }
}

export async function updateProductQuantity(id, prodId, quantity){
    try {
        const updateProdQ = await carritoManager.updateProductQuantity(id, prodId, quantity)
        return updateProdQ
    } catch (error) {
        return error
    }
}

export async function emptyCart(id){
    try {
        const emptyCart = await carritoManager.emptyCart(id)
        return emptyCart
    } catch (error) {
        return error
    }
}


export async function delProdFromCart(cartId, prodId){
    try {
        const delProd = await carritoManager.delProdFromCart(cartId, prodId)
        return delProd
    } catch (error) {
        return error
    }
}

export async function deleteCart(id){
    try {
        const delCart = await carritoManager.deleteCart(id)
    } catch (error) {
        return error
    }
}