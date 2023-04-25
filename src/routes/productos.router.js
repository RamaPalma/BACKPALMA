import { Router } from 'express'

import { getAllProducts, AddOneProduct, getProductById, updateProdById, deleteProdById} from '../controllers/productos.controller.js'

const productRouter = Router()


//get 

productRouter.get('/productos', getAllProducts)
productRouter.get('/:idProduct', getProductById)

//post

productRouter.post('/', AddOneProduct)

//put 

productRouter.put('/:idProduct', updateProdById)

//delete

productRouter.delete('/:idProduct', deleteProdById)


export default productRouter