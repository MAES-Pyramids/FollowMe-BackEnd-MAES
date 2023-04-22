const Student = require('../models/studentsModel');
const APIFeatures = require('../utils/apiFeatures');
//------------handler functions ------------//
exports.getAllStudent = async (req, res) => {
  try {
    // Execute Query
    const features = new APIFeatures(Student.find(), req.query)
      .filter()
      .sort()
      .projection()
      .paginate();

    const students = await features.query;
    res.status(200).json({
      status: 'success',
      results: students.length,
      students
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      student
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newstudent = await Student.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        newstudent
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedStudent
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
//-----------------aggregation pipeline-----------------//
