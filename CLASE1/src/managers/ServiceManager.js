import crypto from "crypto";

class ServiceManager {
    constructor() {
        this.services = [{id:1, name:"Odontologia", price:100, available:true}];
    }
    getServices() {
        return this.services;
    }

    getServicesById(id) {
        return this.services.find(service => service.id === id);
    }

    createService(name, description, price, available) {
        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            price,
            available
        }
        this.services.push(newService);
        return newService
    }

    updateService(id, data) {
        let service = this.getServicesById(id);
        if (!service) return null
        const index = this.services.findIndex(service => service.id === id)
        service = {
            ...service,
            ...data
        }
        this.services[index] = service; //Para guardar en memoria
        return service
    }

    deleteService(id) {
        const index = this.services.findIndex(service => service.id === id);
        if (index === -1) return null
        return this.services.splice(index, 1)[0]
    }

}

const obj = new ServiceManager();
obj.createService("Clinico", "Tratamientos en gral", 100, true)
const update = obj.updateService(1, {price:90})
//obj.deleteService(1);
console.log(obj.getServices())