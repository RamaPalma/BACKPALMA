import  ProductoManager  from "../DAO/productosMongo.js";

const productoManager = new ProductoManager()

export async function getProducts(){
    try {
        const productos = await productoManager.getProduct()
        return productos
    } catch (error) {
        return error
    }
}

export async function addOne(objetoP){
    try {
        const newProducto = await productoManager.addProduct(objetoP)
        return newProducto
    } catch (error) {
        return error
    }
}

export async function getProdById(id){
    try {
        const producto = await productManager.getProductById(id)
        return producto
    } catch (error) {
        return error
    }
}

export async function getProdByIdAndUpdate(id, obj){
    try {
        const updateProducto = await productoManager.updateProduct(id, obj)
        return updateProducto
    } catch (error) {
        return error
    }
}

export async function getProdByIdAndDelete(id){
    try {
        const deleteProducto = await productoManager.deleteProduct(id)
        return deleteProducto
    } catch (error) {
        return error
    }
}