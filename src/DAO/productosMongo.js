import {productoModel} from './models/producto.model.js'

export default class ProductoManager {

    async getProduct(limit) {
        try{
            if (limit != "") {
                const producto = await productoModel.find().limit(limit)
                return producto
            } else {
                const producto = await productoModel.find()
                return producto
            }
        }catch (error) {
            console.log(error)
        }
    }

    async addProduct(objeto){
        try {
            const newProducto = await productoModel.create(objeto)
            return newProducto
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){  
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const producto = await productoModel.findById(id)
            return producto
        }
    } 

    async deleteProduct(idEliminar){
        await productoModel.findByIdAndDelete(idEliminar)
    }

    async updateProduct(productoNuevo,idBuscada){
        await productoModel.findOneAndUpdate(idBuscada,productoNuevo)
    }   
}