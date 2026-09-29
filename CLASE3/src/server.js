import express from "express";
import config from "./config/config.js";
import ServiceManager from "./managers/ServiceManager.js";
import { routingDetector } from "./middlewares/routingDetector.js";

const app = express()
const PORT = config.port;

const service = new ServiceManager("./src/data/services.json")

app.use(express.json());


//ENDPOINT PARA OBTENER TODOS LOS SERVICIOS

app.get("/api/services", routingDetector,  async (req,res) =>{
    try{
    const services = await service.getServices()
    return res.status(200).json({
        status:"success",
        payload : services
    })
}catch(error){
    console.log({message: error })
}
    
})

app.get("/api/services/:sid", routingDetector ,async(req,res)=>{
    try{
    const id = req.params.sid;
    const services = await service.getServicesById(id)
    if(!services){
        return res.status(404).json({
            status : "error",
            payload: "Servicio no encontrado"

        })
    }
    res.status(200).json({
        status :"success",
        payload :services
    })
    }catch(error) {
        console.log({message: error.message})
    }
})


//POST api/services
app.post("/api/services", async (req,res)=>{
    const {
        name,
        description,
        duration,
        price,
        category,
        available
    } = req.body
/*
    if(!name || !duration ||!price || !category ){
        return res.status(400).json({
            status: "error",
            message : "Faltan campos obligatorios"
        })
    }*/

    const services = await service.createService(name, description, duration, price, category, available)

    res.status(201).json({
        status: "success",
        message : "Servicio creado con exito",
        payload: services
    })
})


//PUT api/services/:id
app.put("/api/services/:sid", async(req,res)=>{
    const id = req.params.sid;
    const newService = req.body
    const services = await service.updateService(id, newService);    
    if (services === -1){
        return res.status(404).json({
            status:"error",
            message: "Servicio no encontrado"
        })
    }    
    res.status(200).json({
        status: "success",
        message :"Servicio actualizado con exito",
        payload : services
    })
})

//DELETE api/services/:id

app.delete("/api/services/:sid",async (req,res)=>{
    const id = req.params.sid
    const services = await service.deleteService(id)
    if (!services){
        return res.status(404).json({
            status:"error",
            message: "Servicio no encontrado"
        })
    }
    res.status(200).json({
        status:"success",
        message :"Servicio eliminado correctamente",
        payload :services
    })

})

app.listen(PORT,()=>{
    console.log('Servidor escuchando en localhost:'+PORT)
})