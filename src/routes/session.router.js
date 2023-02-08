import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router()

//vista para registro de usuario
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

//API para crear usuario en DB
router.post('/register', async(req, res) => {
    const userNew = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    edad: req.body.edad,
    password: createHash(req.body.password)
    }

    console.log(userNew);

    const user = new UserModel(userNew)
    await user.save()

    res.redirect('/session/login')
})

//Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

//API para Login

router.post('/login', async (req, res) => {
const { email, password } = req.body

const user = await UserModel.findOne({email}).lean().exec()
if(!user) {
    return res.status(401).render('errors/base', {
        error: 'No se encontro el Usuario'
    } )
}
if(!isValidPassword(user, password)) {
    return res.status(403).send({status: "error", error: "Password Incorrecto"} )
}
delete user.password

req.session.user = user 
res.redirect('/products')    
})

//Cerrar sesion
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).render('errors/base', { error: err })
        } else res.redirect('./login')
    })
})


export default router