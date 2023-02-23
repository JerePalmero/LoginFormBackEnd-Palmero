import {Router} from 'express'
import passport from 'passport'

const router = Router()

router.get('/products', async(req, res) => {
    res.render('products')
})

router.get('/login', async(req, res) => {
    res.render('login')
})

router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email']}),
    async(req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    async(req, res) => {
        console.log("Callback: ", req.user);

        req.session.user = req.user
        console.log("User Session: ", req.session.user);
        res.redirect('/products')
    }
)

export default router
