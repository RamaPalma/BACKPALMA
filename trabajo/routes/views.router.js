import {Router} from "express";

const router = Router()

router.get('/registro',(req,res)=>{
    res.render('registro')
})

router.get('/errorRegistro',(req,res)=>{
    res.render('errorRegistro')
})

router.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/perfil',(req,res)=>{
    res.render('perfil',{email:req.session.email})
})

router.get('/producto',(req,res)=>{
    res.render('home',{producto:req.session.productos})
})


export default router