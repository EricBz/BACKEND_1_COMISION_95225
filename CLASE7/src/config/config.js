import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI
}

export default config
