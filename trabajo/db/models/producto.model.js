import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    },
    price: {
        type: Number,
        required : true,
    },
    thumbnail: {
        type: String,
        required : true,
    },
    code: {
        type: Number,
        required : true,
        unique : true, 
    },
    stock: {
        type: Number,
        required : true,
    }
})


export const productoModel = mongoose.model('productos',productoSchema)