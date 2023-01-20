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
        let id = productos .length === 0 ? 1 : productos[productos.length - 1].id + 1
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

const productManager = new ProductManager('productos.json')

async function test(){
    //await productManager.addProduct('titulo1','descripcion1',100,'miniatura1','codigo1',5)
    //console.log(await productManager.getProductById(2))
    //await productManager.deleteProduct(8)
    
}
//test()

async function modificar(title,description,price,thumbnail,code,stock){
    const producto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }

    await productManager.updateProduct(producto,2)
}

//modificar('titulom','decripm',100,'minm','codm',4)