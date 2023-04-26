const mongoose = require('mongoose');
//-------------------Schema----------------//
const proposalSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'A proposal must belong to a student']
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'A proposal must belong to a doctor']
    },
    title: {
      type: String,
      required: [true, 'A proposal must have a title']
    },
    field: {
      type: String,
      required: [true, 'A proposal must have a field']
    },
    description: {
      type: String,
      required: [true, 'A proposal must have a description']
    },
    ratings: {
      clearness: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Sorry, you must provide a rating']
      },
      spilling: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Sorry, you must provide a rating']
      },
      style: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Sorry, you must provide a rating']
      },
      technicalKnowledge: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Sorry, you must provide a rating']
      },
      overall: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Sorry, you must provide a rating']
      }
    },
    state: {
      type: String,
      enum: ['pending', 'evaluated', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);
//--------------------Model------------------//
const Proposal = mongoose.model('Proposal', proposalSchema);
//--------------------Export-----------------//
module.exports = Proposal;
