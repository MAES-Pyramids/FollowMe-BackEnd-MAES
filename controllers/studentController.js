const catchAsyncError = require('./../utils/catchAsyncError');
const Proposal = require('../models/proposalModel');
const Student = require('../models/studentsModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getStudent = factory.getOne(Student);
exports.getAllStudents = factory.getAll(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
//------------custom functions ------------//
exports.GetAllProposals = catchAsyncError(async (req, res, next) => {
  const proposals = await Proposal.find({ student: req.user.id });
  if (!proposals) {
    return next(new AppError(`No proposals found with that ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    length: proposals.length,
    data: {
      data: proposals
    }
  });
});
