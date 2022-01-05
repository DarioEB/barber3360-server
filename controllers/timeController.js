const Time = require('../models/Time');
const Shift = require('../models/Shift');

exports.createTime = async (req, res, next) => {
    const time = req.body.time;
    try {
        let timeExist = await Time.findOne({time});
        if(timeExist) {
            return res.status(401).json({message: "Ya existe ese horario"});
        }
        const timeNew = new Time(req.body);
        await timeNew.save();

        res.json({time: timeNew, message: "Horario creado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}



exports.updateTime = async (req, res, next) => {
    const id = req.params.id;
    let newTime = {}
    try {
        let time = await Time.findById(id);
        if(!time) {
            return res.status(401).json({message: "El id de horario es incorrecto"});
        }
        newTime.time = req.body.time;
        newTime.status = req.body.status;
        newTime.created = time.created;
        newTime.updated = Date.now();

        time = await Time.findByIdAndUpdate({_id: id}, {$set: newTime}, {new: true});
        res.json({time, message: "Horario actualizado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getAllTimes = async (req, res, next) => {
    try {
        const times = await Time.find().sort({time: 1});
        res.json({times});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getTimes = async (req, res, next) => {
    const date = req.params.date;

    try {
        const shifts = await Shift.find({date});
        const times = await Time.find().sort({time: 1});

        res.json({shifts, times});
    } catch (err) {
        console.log(err);
    }
}

exports.deleteTime = async (req, res, next) => {
    const id = req.params.id;
    try {
        let time = await Time.findById(id);
        if(!time) {
            return res.status(401).json({message: "El id de horario es incorrecto"});
        }
        time = await Time.findByIdAndRemove(id);
        res.json({time, message: "Horario eliminado correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}