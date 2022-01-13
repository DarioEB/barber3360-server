const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
    const name = req.body.name;
    try {
        let category = await Category.findOne({name});
        if(category) {
            return res.status(401).json({message: "Ya existe una categoría con ese nombre"});
        }
        category = new Category(req.body);
        await category.save();
        res.json({message: "Categoría creada correctamente", category});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getCategories = async (req, res, next ) => {
    try {
        const categories = await Category.find()
        res.json({categories});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        let category = await Category.findById(id);
        if(!category) {
            return res.status(401).json({message: "Ya existe una categoría con ese nombre"});
        }
        res.json({category})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.updateCategory = async (req, res, next) => {
    const id = req.params.id;
    let newCategory = {}
    try {
        let category = await Category.findById(id);
        if(!category) {
            return res.status(401).json({message: "El id no pertenece a ninguna categoría"});
        }
        newCategory.name = req.body.name;
        newCategory.selected = category.selected;
        newCategory.created = category.created;
        newCategory.updated = Date.now();
        newCategory.status = req.body.status;

        category = await Category.findByIdAndUpdate({_id: id}, {$set: newCategory}, {new: true});
        res.json({category, message: "Categoría actualizada correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        let category = await Category.findById(id);
        if(!category) {
            return res.status(401).json({message: "El id no pertenece a ninguna categoría"});
        }
        category = await Category.findByIdAndRemove(id);
        res.json({category, message: "Categoría eliminada correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}