import { json } from 'express'
import fs from 'fs'

export class ProductManager{

    constructor(path){
        this.path = path
    }   

    async getProduct(limit) {
        try{
            if(fs.existsSync(this.path)){
                const productos = await fs.promises.readFile(this.path,'utf-8')
                if(limit ==='max'){
                    return JSON.parse(productos)
                }else {
                    return JSON.parse(productos).slice(0,limit)
                }
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async addProduct(objeto) {
        const productos = await this.getProduct()
        let id = 1
        const producto = {id, ...objeto}   
        productos.push(producto)
        await fs.promises.writeFile(this.path,JSON.stringify(productos))
    }

    async updateProduct(productoNuevo,idBuscada){
        const productos = await this.getProduct()
        const indexProducto = productos.findIndex((u => u.id === idBuscada))
        if (indexProducto === -1) throw new Error('Producto no encontrado')
        const productoActualiar = {...productos[indexProducto], ...productoNuevo}   
        productos.splice(indexProducto,1,productoActualiar)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }   

    async getProductById(id){
        const productos = await this.getProduct()
        const producto = productos.find((p) => p.id == parseInt(id))
        if(producto){
            return producto
        } else {
            return 'el producto no existe'
        } 
    } 

    async deleteProduct(idEliminar){
        const productos = await this.getProduct()
        const indexProducto = productos.findIndex((u => u.id === idEliminar))
        if (indexProducto === -1) throw new Error('Producto no encontrado') 
        productos.splice(indexProducto,1)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }

}

