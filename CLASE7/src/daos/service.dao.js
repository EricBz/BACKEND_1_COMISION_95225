import crypto from "crypto";
import fs from "fs/promises";

class ServiceDao {
    constructor(path) {
        this.path = path;
    }

    async #readServices() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data) //json -> obj

    }

    async #writeServices(services) {
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
    }

    async getServices() {
        return await this.#readServices();
    }

    async getServicesById(id) {
        const services = await this.#readServices();
        return services.find(service => service.id === id)
    }

    async createService(name, description, duration ,price,category, available) {
        const services = await this.#readServices();
        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            duration,
            price,
            category,
            available
        }
        services.push(newService);
        await this.#writeServices(services);
        return newService
    }

    async updateService(id, data) {
        const services = await this.#readServices();
        const index = services.findIndex(services => services.id === id);
        if (index === -1) return null
        services[index]= {
            ...services[index],
            ...data
        }
        await this.#writeServices(services)
        return services[index]
    }

    async deleteService(id) {
        const services = await this.#readServices()
        const index = services.findIndex(service => service.id === id);
        if (index === -1) return null
        const deleteService = services.splice(index, 1)[0]
        await this.#writeServices(services)
        return deleteService
    }

}

export default ServiceDao


/*
const obj = new ServiceManager();
obj.createService("Clinico", "Tratamientos en gral", 100, true)
const update = obj.updateService(1, {price:90})
//obj.deleteService(1);
console.log(obj.getServices())*/