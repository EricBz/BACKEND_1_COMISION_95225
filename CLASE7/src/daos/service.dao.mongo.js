import { serviceModel } from "./models/service.model.js";


class ServiceDao {


async getServices() {
    return await serviceModel.find().lean();
}

async getServicesById(id) {
    return  await serviceModel.findById(id).lean();
}

async createService(data) {
   return await serviceModel.create(data)
}

async updateService(id, data) {
   return await serviceModel.findByIdAndUpdate(id,data,{
    new:true,
    runValidators:true
   })
}

async deleteService(id) {
    return await serviceModel.findByIdAndDelete(id);
}

}


export default ServiceDao



