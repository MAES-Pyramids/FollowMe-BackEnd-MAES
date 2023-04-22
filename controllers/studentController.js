const Student = require('../models/studentsModel');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getStudent = factory.getOne(Student);
exports.getAllStudents = factory.getAll(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
