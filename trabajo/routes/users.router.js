import {Router} from "express";
import {usersModel} from '../db/models/user.models.js'
import { hashPassword,comparePasswords } from "../util.js";
import passport from "passport";

const router = Router()

/*
router.post('/registro', async(req,res)=>{ 
    const {email,password} = req.body
    const existeUsuario = await usersModel.find({email})
    if (existeUsuario.length!==0) {
        res.redirect('/views/errorRegistro')
    } else {
        const hashNewPassword = await hashPassword(password)
        const newUser = {...req.body,password:hashNewPassword}
        await usersModel.create(newUser)
        res.redirect('/views/login')
    }
})*/

router.post('/registro',passport.authenticate('registro',{ 
    failureRedirect: '/views/errorRegistro',
    successRedirect: '/views/perfil',
    passReqToCallback: true 
}))

router.post('/login', async(req,res)=>{
    const {email,password}  = req.body
    const usuario = await usersModel.find({email})
    if (usuario.length!==0) {

        const isPassword = await comparePasswords(password, usuario[0].password)

        if(isPassword){
            for (const key in req.body) {
            req.session[key] = req.body[key]
        }
            req.session.loged = true
            res.redirect('/views/perfil')
        }else{
        res.redirect('/views/errorLogin')
    }}
    
})

router.get('/logout',(req,res)=> {
    req.session.destroy((error)=>{
        if(error)console.log(error);
        else res.redirect('/views/login')
    })
})

export default router