const express = require('express');
const authController = require('../controllers/authController');
const doctorController = require('../controllers/doctorController');
const studentController = require('../controllers/studentController');
const unitCoordinatorController = require('../controllers/unitCoordinatorController');

//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
const doctorAuthDoctorMiddleware = [
  authController.protect,
  authController.restrictTo('Doctor')
];
// const studentAuthDoctorMiddleware = [
//   authController.protect,
//   authController.restrictTo('Student')
// ];
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
  .get(...doctorAuthDoctorMiddleware, doctorController.GetAllProposals);

router
  .route('/me/students')
  .get(...doctorAuthDoctorMiddleware, doctorController.GetMyStudents);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(unitCoordinatorController.getAllDoctor)
  .post(unitCoordinatorController.createDoctor);
router.use(authController.protect, authController.restrictTo('SuperDoctor'));
router
  .route('/:id')
  .get(unitCoordinatorController.getDoctor)
  .patch(unitCoordinatorController.updateDoctor)
  .delete(unitCoordinatorController.deleteDoctor);
//-------------------------------------------//
module.exports = router;
