import mongoose from "mongoose";

const URI_MONGO = 'mongodb+srv://ramiroP:ramiroP@cluster0.0zxay99.mongodb.net/productos?retryWrites=true&w=majority'

mongoose.connect(URI_MONGO,(error)=>{
    if (error) {
        console.log(error);
    } else {
        console.log('conectado a la base de datos')
    }
})