import mongoose from "mongoose";
import config from '../config.js'

const URI_MONGO = config.uri

mongoose.connect(URI_MONGO,(error)=>{
    if (error) {
        console.log(error);
    } else {
        console.log('conectado a la base de datos')
    }
})