const Service = require('../models/Service');
const Category = require('../models/Category');

exports.createService = async (req, res, next) => {
    const name = req.body.name;
    const category = req.body.category;
    try {
        let categoryExist = await Category.findById(category);
        if(!categoryExist) {
            return res.status(404).json({message: "La categoría no es válida"});
        }

        let service = await Service.findOne({name});
        if(service) {
            return res.status(401).json({message: "Ya existe un servicio con ese nombre"});
        }

        service = new Service(req.body);
        await service.save();
        res.json({service, message: "Servicio creado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find().populate("category");
        res.json({services});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}


exports.getService = async (req, res, next) => {
    const id = req.params.id;
    try{
        let service = await Service.findById(id).populate("category");
        if(!service) {
            return res.status(401).json({message: "El id de servicio es incorrecto"});
        }
        res.json({service});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}


exports.updateService = async (req, res, next) => {
    const id = req.params.id;
    const category = req.body.category;
    console.log(id);
    console.log(category);
    let newService = {}
    try {
        let categoryExist = await Category.findById(category);
        if(!categoryExist){
            return res.status(404).json({message: "La categoría no es válida"});
        }

        let service = await Service.findById(id);
        if(!service) {
            return res.status(401).json({message: "El id del servicio es incorrecto"});
        }

        newService.name = req.body.name;
        newService.price = req.body.price;
        newService.category = category;
        newService.selected = categoryExist.selected;
        newService.status = req.body.status;
        newService.created = categoryExist.created;
        newService.updated = Date.now();

        service = await Service.findByIdAndUpdate({_id: id}, {$set: newService}, {new: true}).populate("category");
        res.json({service, message: "Servicio actualizado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.deleteService = async (req, res, next) => {
    const id = req.params.id;
    try {
        let service = await Service.findById(id);
        if(!service) {
            return res.status(401).json({message: "El id de servicio es incorrecto"});
        }
        service = await Service.findByIdAndRemove(id);
        res.json({service, message: "Servicio eliminado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}