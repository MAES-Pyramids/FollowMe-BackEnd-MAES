const mongoose = require('mongoose');
const validator = require('validator');
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
//-------------------Schema----------------//
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: [true, 'A user must have a name']
    },
    email: {
      type: 'string',
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      type: 'string',
      default: 'default.jpg'
    },
    role: {
      type: String,
      enum: ['normal', 'second'],
      default: 'normal'
    },
    password: {
      type: 'string',
      required: [true, 'A user must have a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: 'string',
      required: [true, 'A user must have a password confirmation'],
      // This only works on CREATE and SAVE!!!
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt: {
      type: Date,
      select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    proposedDoctors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
      }
    ],
    targetDoctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Doctor'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//-------------Queries middleware------------//
studentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'targetDoctor',
    select: '-passwordConfirm -maxStudents -__v'
  });
  next();
});
studentSchema.pre(/^find/, function(next) {
  this.select('-passwordConfirm -role -__v');
  next();
});
//--------------------Model------------------//
const Student = mongoose.model('Student', studentSchema);
//--------------------Export-----------------//
module.exports = Student;
