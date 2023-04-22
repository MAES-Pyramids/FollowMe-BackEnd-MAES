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
    ratings: [
      {
        criteria: {
          type: String,
          required: [true, 'A rating must have a criteria']
        },
        value: {
          type: Number,
          min: 0,
          max: 10,
          required: [true, 'A rating must have a value']
        }
      }
    ]
  },
  {
    timestamps: true
  }
);
//--------------------Model------------------//
const Proposal = mongoose.model('Proposal', proposalSchema);
//--------------------Export-----------------//
module.exports = Proposal;
