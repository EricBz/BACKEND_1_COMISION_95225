import ServiceManager from "../daos/service.dao.js";
import ServiceServices from "../services/services.service.js";
//const service = new ServiceManager("./src/data/services.json");
const service = new ServiceServices()

export const getServices = async (req, res) => {
    try{
        const services = await service.getServices()
        return res.status(200).json({
            status:"success",
            payload : services
        })
    }catch(error){
        res.status(404).json({error: error.message})
        console.log({message: error })
    }
}

export const getServicesById = async (req, res) => {
    try{
    const id = req.params.id;
    const services = await service.getServicesById(id)
    res.status(200).json({
        status :"success",
        payload :services
    })
    }catch(error) {
        console.log({message: error.message})
        res.status(404).json({error: error.message})
    }
}

export const createService = async (req, res) => {
    try{
    const {
        name,
        description,
        duration,
        price,
        category,
        available
    } = req.body
    const services = await service.createService(name, description, duration, price, category, available)
    res.status(201).json({
        status: "success",
        message : "Servicio creado con exito",
        payload: services
    })
    
    }catch(error) {
        res.status(404).json({error: error.message})
        console.log({message: error.message})
    }
    

}

export const updateService = async (req, res) => {
    try{
    const id = req.params.id;
    const newService = req.body
    const services = await service.updateService(id, newService);    
    res.status(200).json({
        status: "success",
        message :"Servicio actualizado con exito",
        payload : services
    })
    
    }catch(error) {
        res.status(404).json({error: error.message})
        console.log({message: error.message})
    }
    
}

export const deleteService = async (req, res) => {
    try{
    const id = req.params.id
    const services = await service.deleteService(id)
    res.status(200).json({
        status:"success",
        message :"Servicio eliminado correctamente",
        payload :services
    })
    
    }catch(error) {
        res.status(404).json({error: error.message})
        console.log({message: error.message})
    }
    
}