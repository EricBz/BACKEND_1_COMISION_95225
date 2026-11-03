import http from "http";
import app from "./app.js";
import config from "./config/config.js";
import { connectDB } from "./config/database.config.js";
import { Server } from "socket.io";
import { serviceModel } from "./daos/models/service.model.js";

const PORT = config.port;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", async (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Al conectarse, le mando la lista actual de una vez
    const services = await serviceModel.find().lean();
    socket.emit("services_updated", services);
  });
//watch es de mongoose, avisa de cambios como los eventos y nos devuelve el obj
  // Cuando cambia la base, aviso a todos
  serviceModel.watch().on("change", async () => {
    const services = await serviceModel.find().lean();
    io.emit("services_updated", services);
  });

  server.listen(PORT, () => {
    console.log("Servidor escuchando en localhost:" + PORT);
  });
};

startServer().catch((error) => {
  console.error("Error al iniciar el servidor", error);
});