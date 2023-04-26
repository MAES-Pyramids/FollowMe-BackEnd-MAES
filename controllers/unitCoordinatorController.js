const factory = require('./handlerFactory');
// const AppError = require('./../utils/appError');
const Doctor = require('../models/doctorsModel');
const Student = require('../models/studentsModel');
const Proposal = require('../models/proposalModel');
// const catchAsync = require('./../utils/catchAsyncError');
//------------Doctors functions ------------//
exports.getDoctor = factory.getOne(Doctor);
exports.getAllDoctor = factory.getAll(Doctor);
exports.createDoctor = factory.createOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.deleteDoctor = factory.deleteOne(Doctor);
//------------Student functions ------------//
exports.getStudent = factory.getOne(Student);
exports.getAllStudents = factory.getAll(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
//------------Proposal functions ------------//
exports.getProposal = factory.getOne(Proposal);
exports.getAllProposals = factory.getAll(Proposal);
exports.createProposal = factory.createOne(Proposal);
exports.updateProposal = factory.updateOne(Proposal);
exports.deleteProposal = factory.deleteOne(Proposal);
