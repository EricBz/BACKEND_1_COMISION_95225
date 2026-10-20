import ServiceRepository from "../repositories/services.repository.js";

export default class ServiceServices {
    constructor(services = new ServiceRepository()) {
        this.services = services;
    }

    async getServices() {
        const services = await this.services.getServices()
        if (services.length === 0) {
            throw new Error("Servicios no encontrados")
        }
        return services
    }

    async getServicesById(id) {
        const service = await this.services.getServiceById(id)
        if (!service) {
            throw new Error("No se encuentra el servicio...")
        }
        return service
    }
    
    async createService(name, description, duration, price, category, available) {
        if (!name || !description || !price) {
            throw new Error("Faltan datos, completar...")
        }
        return await this.services.createService(name, description, duration, price, category, available)
    }

    async updateService(id, serviceUpdate) {
        if (!id) {
            throw new Error("Por favor ingrese un id...")
        }
        const service = await this.services.updateService(id, serviceUpdate)
        if (!service) {
            throw new Error("No se encuentra el servicio...")
        }
        return service
    }   
    
    async deleteService(id) {
        if (!id) {
            throw new Error("Por favor ingrese un id...")
        }
        const service = await this.services.deleteService(id)
        if(!service) {
          throw new Error("No se encuentra el servicio...")  
        }
        return service
    }
    
}