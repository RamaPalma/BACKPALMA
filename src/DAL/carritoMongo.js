import { carritoModel } from "../DAL/models/carrito.models.js";

export default class CarritoManager {
    
    
    async addCarrito(objeto) {
        try {
            const newCarrito = await carritoModel.create(objeto)
            return newCarrito
        } catch (error) {
            console.log(error)
        }
    }

}