import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Productos',
                default:[],
            },
            quantity: {
                type: Number,
            }
        }
    ]
})


carritoSchema.pre('find', function(next){
    this.populate('products.product')
    next()
})

export const carritoModel = mongoose.model('Carrito', carritoSchema)