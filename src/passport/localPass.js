import passport from "passport";
import { Strategy as localStrategy} from "passport-local";
import { usersModel } from "../DAO/models/user.models.js";
import { hashPassword } from "../utils/util.js";

passport.use('registro', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done)=>{
    const usuario = await usersModel.find({email})
    if (usuario.length !== 0){
        return done (null,false)
    }   
        const hashNewPassword = await hashPassword(password)
        const newUser = {...req.body,password:hashNewPassword}
        const newUserBD =  await usersModel.create(newUser)
        done(null,newUserBD)
}))


passport.serializeUser((usuario,done) =>{
    done(null,usuario._id)
})

passport.deserializeUser(async(_id,done)=>{
    const usuario = await usersModel.findById(_id)
    done(null,usuario)
})