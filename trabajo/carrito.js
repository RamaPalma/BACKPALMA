import { json } from 'express'
import fs from 'fs'

export class CarritoManager{

    constructor(path){
        this.path = path
    }   

    async getCarrito() {
        try{
            if(fs.existsSync(this.path)){
                const carrito = await fs.promises.readFile(this.path,'utf-8')
                    return JSON.parse(carrito)
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async addCarrito(objeto) {
        const carritos = await this.getCarrito()
        let id = carritos .length === 0 ? 1 : carritos[carritos.length - 1].id + 1
        const carrito = {id, ...objeto}   
        carritos.push(carrito)
        await fs.promises.writeFile(this.path,JSON.stringify(carritos))
    }

    async getCarritoById(id){
        const carritos = await this.getCarrito()
        const carrito = carritos.find((p) => p.id == parseInt(id))
        if(carrito){
            return carrito
        } else {
            return 'el carrito no existe'
        } 
    } 

    async addProductToCarrito(cid,pid){
    }
}
