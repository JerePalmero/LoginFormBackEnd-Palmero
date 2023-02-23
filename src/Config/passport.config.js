import passport from "passport"
import UserGitModel from "../dao/models/usergithub.model.js";
import GitHubStrategy from "passport-github2"

const initializePassport = () => {


    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.a921d6102a249409",
        clientSecret: "92c970321f572e81e1b4c19a40430aea1609d848",
        callbackURL: "http://192.168.1.10:8080/api/sessiongithub/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
            const user = await UserGitModel.findOne({email: profile._json.email})
            if(user) return done(null, user)

            const newUser = await UserGitModel.create({
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                password: ""
            })

            return done(null, newUser)
        } catch (error) {
            return done('Error to login with github' + error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserGitModel.findById(id)
        done(null, user)
    })

}

export default initializePassport
