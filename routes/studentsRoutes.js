const express = require('express');
const studentsController = require('../controllers/studentsController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
router
  .route('/')
  .get(studentsController.getAllStudent)
  .post(studentsController.createStudent);
router
  .route('/:id')
  .get(studentsController.getStudent)
  .patch(studentsController.createStudent)
  .delete(studentsController.deleteStudent);

//-------------------------------------------//
module.exports = router;
