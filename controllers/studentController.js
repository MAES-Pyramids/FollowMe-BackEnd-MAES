const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const Doctor = require('../models/doctorsModel');
const Student = require('../models/studentsModel');
const Proposal = require('../models/proposalModel');
const catchAsync = require('./../utils/catchAsyncError');

//------------handler functions ------------//
exports.getStudent = factory.getOne(Student);
exports.getAllStudents = factory.getAll(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);

//------------custom functions ------------//
exports.getAllProposals = catchAsync(async (req, res, next) => {
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

exports.sendDoctorProposals = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return next(new AppError(`No doctor found with that ID`, 404));
  }

  const student = await Student.findById(req.user.id);
  if (student.proposedDoctors.includes(doctor._id)) {
    return next(
      new AppError(
        `Sorry, you have already sent a proposal to this doctor`,
        404
      )
    );
  }

  const newProposal = await Proposal.create({
    student: req.user.id,
    doctor: req.params.id,
    title: req.body.title,
    field: req.body.field,
    description: req.body.description
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newProposal
    }
  });
});

exports.submitDoctor = catchAsync(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.proposalID);
  if (!proposal) {
    return next(
      new AppError(`Sorry, this proposal isn't available anymore`, 404)
    );
  }

  if (proposal.state !== 'accepted') {
    return next(
      new AppError(`Sorry, proposal must be accepted by the doctor first`, 404)
    );
  }

  if (proposal.student.toString() !== req.user.id) {
    return next(
      new AppError(`Sorry, you are not the owner of this proposal`, 404)
    );
  }

  const student = await Student.findById(req.user.id);
  if (student.targetDoctor) {
    return next(new AppError(`Sorry, you have already chosen a doctor`, 404));
  }

  student.targetDoctor = proposal.doctor;
  await student.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      data: student
    }
  });
});
