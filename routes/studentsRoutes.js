const express = require('express');
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
//-------------Users Routes-----------------//
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);
//--------------Active User-----------------//
// router.get('/Me', usersController.getMe, usersController.getUser);
// router.patch('/UpdateMe', usersController.UpdateMe);
// router.delete('/DeleteMe', usersController.DeleteMe);
// router.patch('/updatePassword', authController.updatePassword);
router.get(
  '/me/proposals',
  authController.protect,
  studentController.getAllProposals
);
router.get(
  '/:proposalID/doctorSubmit',
  authController.protect,
  studentController.submitDoctor
);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);
router
  .route('/:id')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);
//-------------------------------------------//
module.exports = router;
