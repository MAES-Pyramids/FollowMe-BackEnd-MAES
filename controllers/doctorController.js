const Doctor = require('../models/doctorsModel');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getDoctor = factory.getOne(Doctor);
exports.getAllDoctor = factory.getAll(Doctor);
exports.createDoctor = factory.createOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.deleteDoctor = factory.deleteOne(Doctor);
