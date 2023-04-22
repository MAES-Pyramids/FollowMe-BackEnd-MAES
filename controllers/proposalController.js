const Proposal = require('../models/proposalModel');
const factory = require('./handlerFactory');
//------------handler functions ------------//
exports.getProposal = factory.getOne(Proposal);
exports.getAllProposals = factory.getAll(Proposal);
exports.createProposal = factory.createOne(Proposal);
exports.updateProposal = factory.updateOne(Proposal);
exports.deleteProposal = factory.deleteOne(Proposal);
