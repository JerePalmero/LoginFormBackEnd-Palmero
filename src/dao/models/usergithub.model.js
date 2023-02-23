import mongoose from "mongoose";

const UserGitModel = mongoose.model('usersgithub', mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String
}))

export default UserGitModel