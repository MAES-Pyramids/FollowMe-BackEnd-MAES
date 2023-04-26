const catchAsyncError = require('./../utils/catchAsyncError');
const Proposal = require('../models/proposalModel');
const Student = require('../models/studentsModel');
// const Doctor = require('../models/doctorsModel');
const AppError = require('./../utils/appError');
//------------custom functions ------------//
exports.GetAllProposals = catchAsyncError(async (req, res, next) => {
  const proposals = await Proposal.find({ doctor: req.user.id });
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
exports.GetMyStudents = catchAsyncError(async (req, res, next) => {
  const students = await Student.find({ targetDoctor: req.user.id });
  if (!students) {
    return next(new AppError(`No students found in your class yet`, 404));
  }
  res.status(200).json({
    status: 'success',
    length: students.length,
    data: {
      data: students
    }
  });
});
//-------------------------------------------//
