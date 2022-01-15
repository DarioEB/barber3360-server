const Shift = require('../models/Shift');
const Service = require('../models/Service');
const Category = require('../models/Category');

exports.createShift = async (req, res, next) => {
    let services = req.body.services;

    try {
        const shift = new Shift(req.body);
        await shift.save();

        services.forEach( async service => {
            updateSelectedService(service);
            updateSelectedCategory(service.category);
        });      

        res.json({shift, message: "Turno creado correctamente"});
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Hubo un error" });
    }
}

exports.updateShift = async (req, res, next) => {
    const id = req.params.id;
    let newShift = {}
    try {
        let shift = await Shift.findById(id);
        if(!shift) {
            return res.status(401).json({message: "El id no pertenece a ningún turno"});
        }
        newShift.name = req.body.name;
        newShift.lastname = req.body.lastname;
        newShift.email = req.body.email;
        newShift.phone = req.body.phone;
        newShift.services = req.body.services;
        newShift.date = req.body.date;
        newShift.time = req.body.time;
        newShift.price = req.body.price;
        newShift.status = req.body.status;
        newShift.created = req.body.created;
        newShift.updated = Date.now();

        shift = await Shift.findByIdAndUpdate({_id:id}, {$set: newShift}, {new: true});
        res.json({shift, message: "Turno actualizado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

const updateSelectedService = async (service) => {
    let newService = {}
    newService.name = service.name;
    newService.price = service.price;
    newService.selected = Number(service.selected)+1;
    newService.status = service.status;
    newService.created = service.created;
    newService.updated = service.updated;

    try {
        
        service = await Service.findByIdAndUpdate({ _id: service._id }, { $set: newService }, { new: true });
    } catch (err) {
        console.log(err);
        res.status(501).json({message: "Error al actualizar el dato de servicio"})
    }
}

const updateSelectedCategory = async (category) => {
    let newCategory = {}
    newCategory.name = category.name;
    newCategory.selected = Number(category.selected) + 1;
    newCategory.created = category.created;
    newCategory.updated = category.updated;
    newCategory.status = category.status;

    try {
        category = await Category.findByIdAndUpdate({_id: category._id}, {$set: newCategory}, {new: true});
        
    } catch (err) {
        console.log(err);
        res.status(501).json({message: "Error al actualizar el dato de categoría"})
    }
}

exports.getShiftsDate = async (req, res, next) => {
    const date = req.params.date;
    try {
        const shifts = await Shift.find({date});
        res.json({shifts});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Hubo un error" });
    }
}