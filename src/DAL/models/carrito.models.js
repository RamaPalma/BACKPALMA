import mongoose from "mongoose";


const carritoSchema  = new mongoose.Schema ({
    productos: {
        type: [ 
                { 
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "productos"
                    },
                    quantity:{
                        type: Number,
                        required: true,
                        default: 1
                    }
                }
            ],
        default: [ ]
    }
})

carritoSchema.pre('find', function(){
    this.populate('productos.productos')
})

export const carritoModel = mongoose.model('carrito',carritoSchema)