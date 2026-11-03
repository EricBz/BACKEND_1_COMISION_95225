import mongoose from "mongoose";
import config from "./config.js";
//Importan la configuracion de el env
export const connectDB = async () => {
try {
await mongoose.connect(config.mongoUri)
console.log("Conexion a mongo db exitosa")
} catch (error) {
console.error("Error al conectarse a la db")
}
}