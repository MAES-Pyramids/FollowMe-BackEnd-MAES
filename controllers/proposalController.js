const catchAsyncError = require('./../utils/catchAsyncError');
const Proposal = require('../models/proposalModel');
const Student = require('../models/studentsModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getProposal = factory.getOne(Proposal);
exports.getAllProposals = factory.getAll(Proposal);
exports.createProposal = factory.createOne(Proposal);
exports.updateProposal = factory.updateOne(Proposal);
exports.deleteProposal = factory.deleteOne(Proposal);
//------------custom functions ------------//
exports.acceptProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.id);
  if (!proposal) {
    return next(new AppError(`No proposal found with that ID`, 404));
  }
  if (proposal.state !== 'evaluated') {
    return next(
      new AppError(
        `sorry, Proposal must be evaluated first before it could be accepted`,
        404
      )
    );
  }
  if (JSON.stringify(proposal.doctor) !== JSON.stringify(req.user.id)) {
    return next(
      new AppError(
        `sorry, You are not the doctor who can accept this proposal`,
        404
      )
    );
  }
  // set the doctor Id in the student proposedDoctors array
  const student = await Student.findByIdAndUpdate(
    proposal.student,
    {
      $push: { proposedDoctors: proposal.doctor }
    },
    { new: true }
  );
  await student.save({ validateBeforeSave: false });
  // change the proposal state to accepted
  proposal.state = 'accepted';
  await proposal.save();
  // send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});
exports.rejectProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.id);
  if (!proposal) {
    return next(new AppError(`No proposal found with that ID`, 404));
  }
  if (proposal.state !== 'pending') {
    return next(new AppError(`This proposal isn't pending anymore`, 404));
  }
  if (JSON.stringify(proposal.doctor) !== JSON.stringify(req.user.id)) {
    return next(
      new AppError(
        `sorry, You are not the doctor who can reject this proposal`,
        404
      )
    );
  }
  // change the proposal state to rejected
  proposal.state = 'rejected';
  await proposal.save();
  // send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});
exports.evaluateProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.id);
  if (!proposal) {
    return next(new AppError(`No proposal found with that ID`, 404));
  }
  if (proposal.state !== 'pending') {
    return next(new AppError(`This proposal isn't pending anymore`, 404));
  }
  if (JSON.stringify(proposal.doctor) !== JSON.stringify(req.user.id)) {
    return next(
      new AppError(
        `sorry, You are not the doctor who can reject this proposal`,
        404
      )
    );
  }
  proposal.ratings = {
    clearness: req.body.clearness,
    spilling: req.body.spilling,
    style: req.body.style,
    technicalKnowledge: req.body.technicalKnowledge,
    overall: req.body.overall
  };
  proposal.state = 'evaluated';
  await proposal.save();
  // send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});
