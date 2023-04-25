import { carritoModel } from "../DAO/models/carrito.models.js";


export default class CarritoManager {

    async findAll(){
        try {
            const carts = await carritoModel.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(objCart){
        try {
            const newCart = await carritoModel.create(objCart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId){
        try {
            const cart = await carritoModel.find({_id:cartId})
            if(cart){
                console.log(cart)
                return cart;
            } else{
                return 'error found'
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async addProdToCart(id, idProduct) {
        try {
            const cart = await carritoModel.findById(id);
            const product = { product : idProduct}
            if(!cart){
                return console.log('cart not found')
            }else{
                cart.products.push(product)
                cart.save()
                return cart
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateProductQuantity(id, prodId, quantity) {
        try {
            const cart = await this.getCartById(id);
            const product = cart.products.find((product) => product._id == prodId);
            if (!cart) {
                return console.log("Cart not found");
            } else {
            product.quantity = quantity;
            cart.save();
            return cart;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }


    async emptyCart(id){
        try {
            const cart = await carritoModel.findById(id)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error);
        }
    }

    async delProdFromCart(cartId, prodId){
        try {
            const cart = await carritoModel.findById(cartId)
            cart.products = cart.products.filter((x) => x.product != prodId)
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteCart(id) {
        try {
            const cart = await carritoModel.findByIdAndDelete(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    } 
}