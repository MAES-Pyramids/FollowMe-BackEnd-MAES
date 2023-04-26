const express = require('express');
const authController = require('../controllers/authController');
const doctorController = require('../controllers/doctorController');
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
router.post(
  '/:id/proposal',
  authController.protect,
  authController.restrictTo('Student'),
  studentController.sendDoctorProposals
);
router
  .route('/me/proposals')
  .get(authController.protect, doctorController.GetAllProposals);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDoctor);
router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);
//-------------------------------------------//
module.exports = router;
