import ServicesService from "../services/services.service.js";

const servicesService= new ServicesService()

class ViewController {
    static async getServices(req, res, next) {
        try {
            const services = await servicesService.getServices()
             res.render("services", {title: "Servicios", services})            
        } catch (error) {
            next(error)
        }
    }

}

export default ViewController