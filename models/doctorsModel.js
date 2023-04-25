const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
//-------------------Managing Password------------------//
// Encrypt the password before saving it to the database
// Note: data will get check by validator before it gets to this document middleware
doctorSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});
// Set the passwordChangedAt property to the current time before saving the document
doctorSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// Hide inactive users
doctorSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});
//-------------------Instance Methods-------------------//
// Check if the password is correct
doctorSchema.methods.correctPassword = async function(loginPass, userPass) {
  return await bcrypt.compare(loginPass, userPass);
};
// Check if the password was changed after the token was issued
doctorSchema.methods.isPasswordChanged = function(JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTtimeStamp < changedTimeStamp;
  }
  return false;
};
//--------------------Model------------------//
const Doctor = mongoose.model('Doctor', doctorSchema);
//--------------------Export-----------------//
module.exports = Doctor;
