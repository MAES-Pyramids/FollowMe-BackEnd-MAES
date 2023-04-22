const mongoose = require('mongoose');
const validator = require('validator');
//-------------------Schema----------------//
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A doctor must have a name']
    },
    email: {
      type: String,
      required: [true, 'A doctor must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    maxStudents: {
      type: Number,
      required: [true, 'A doctor must have a maximum number of students'],
      min: 1
    },
    password: {
      type: String,
      required: [true, 'A doctor must have a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A doctor must have a password confirmation'],
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//--------------------Model------------------//
const Doctor = mongoose.model('Doctor', doctorSchema);
//--------------------Export-----------------//
module.exports = Doctor;
