const catchAsyncError = require('../utils/catchAsyncError');
const Proposal = require('../models/proposalModel');
const Student = require('../models/studentsModel');
const AppError = require('../utils/appError');

// Helper functions
async function getProposalById(id, next) {
  const proposal = await Proposal.findById(id);

  if (!proposal) {
    return next(new AppError(`No proposal found with that ID`, 404));
  }

  return proposal;
}

function checkDoctorIsAuthorized(proposal, userId, next) {
  if (JSON.stringify(proposal.doctor) !== JSON.stringify(userId)) {
    return next(
      new AppError(
        `Sorry, you are not the doctor who can perform this action`,
        404
      )
    );
  }
}

// Custom functions
exports.acceptProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await getProposalById(req.params.id, next);

  if (proposal.state !== 'evaluated') {
    return next(
      new AppError(
        `Sorry, proposal must be evaluated first before it can be accepted`,
        404
      )
    );
  }

  checkDoctorIsAuthorized(proposal, req.user.id, next);

  // Set the doctor Id in the student proposedDoctors array
  await Student.findByIdAndUpdate(
    proposal.student,
    {
      $push: { proposedDoctors: proposal.doctor }
    },
    { new: true, runValidators: true }
  );

  // Change the proposal state to accepted
  proposal.state = 'accepted';
  await proposal.save();

  // Send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});

exports.rejectProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await getProposalById(req.params.id, next);

  if (proposal.state !== 'pending') {
    return next(new AppError(`This proposal isn't pending anymore`, 404));
  }

  checkDoctorIsAuthorized(proposal, req.user.id, next);

  // Change the proposal state to rejected
  proposal.state = 'rejected';
  await proposal.save();

  // Send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});

exports.evaluateProposal = catchAsyncError(async (req, res, next) => {
  const proposal = await getProposalById(req.params.id, next);

  if (proposal.state !== 'pending') {
    return next(new AppError(`This proposal isn't pending anymore`, 404));
  }

  checkDoctorIsAuthorized(proposal, req.user.id, next);

  proposal.ratings = {
    clearness: req.body.clearness,
    spilling: req.body.spilling,
    style: req.body.style,
    technicalKnowledge: req.body.technicalKnowledge,
    overall: req.body.overall
  };
  proposal.state = 'evaluated';
  await proposal.save();

  // Send the response
  res.status(200).json({
    status: 'success',
    data: {
      data: proposal
    }
  });
});
