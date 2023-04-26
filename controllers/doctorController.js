const catchAsyncError = require('./../utils/catchAsyncError');
const Proposal = require('../models/proposalModel');
const Doctor = require('../models/doctorsModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getDoctor = factory.getOne(Doctor);
exports.getAllDoctor = factory.getAll(Doctor);
exports.createDoctor = factory.createOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.deleteDoctor = factory.deleteOne(Doctor);
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
//-------------------------------------------//
