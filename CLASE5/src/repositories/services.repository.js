import ServiceDao from "../daos/service.dao.js";

export default class ServiceRepository {
    constructor(services = new ServiceDao("./src/data/services.json")) {
        this.services = services
    }

    async getServices() {
        return await this.services.getServices()
    }   
    
    async getServiceById(id) {
        return await this.services.getServicesById(id)
    }

    async createService(name, description, duration, price, category, available) {
        return await this.services.createService(name, description, duration, price, category, available)
    }

    async updateService(id, newService) {
        return await this.services.updateService(id, newService)
    }

    async deleteService(id) {
        return await this.services.deleteService(id)
    }
}