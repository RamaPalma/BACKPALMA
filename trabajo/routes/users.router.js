import {Router} from "express";
import {usersModel} from '../db/models/user.models.js'

const router = Router()


router.post('/registro', async(req,res)=>{
    const {email,password} = req.body
    const existeUsuario = await usersModel.find({email,password})
    if (existeUsuario.length!==0) {
        res.redirect('/views/errorRegistro')
    } else {
        await usersModel.create(req.body)
        res.redirect('/views/login')
    }
})

router.post('/login', async(req,res)=>{
    const {email,password}  = req.body
    const usuario = await usersModel.find({email,password})
    if (usuario.length!==0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.loged = true
        res.redirect('/views/perfil')
    }else{
        res.redirect('/views/errorLogin')
    }
    
})

router.get('/logout',(req,res)=> {
    req.session.destroy((error)=>{
        if(error)console.log(error);
        else res.redirect('/views/login')
    })
})

export default router