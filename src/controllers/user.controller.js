import { usersModel } from '../DAO/models/user.models.js';
import {hashPassword, comparePasswords} from '../utils/util.js';
import {addOneUser} from '../services/user.services.js';
import passport from 'passport'


export async function loginUser(req,res){
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
}

export async function logoutUser (req,res) {
        
    req.session.destroy((error)=>{
        
        if(error)console.log(error);
        
            else res.redirect('/views/login')
})
}


export async function registro(req,res) {
    passport.authenticate('registro',{ 
        failureRedirect: '/views/errorRegistro',
        successRedirect: '/views/perfil',
        passReqToCallback: true 
    })
}


