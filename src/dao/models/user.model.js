import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    edad: Number,
    password: String,
    role: String

})

mongoose.set("strictQuery", false);
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel