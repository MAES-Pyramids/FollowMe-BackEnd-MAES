const express = require('express');
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentController');
const unitCoordinatorController = require('../controllers/unitCoordinatorController');
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
router.use(authController.protect, authController.restrictTo('SuperDoctor'));
router
  .route('/')
  .get(unitCoordinatorController.getAllStudents)
  .post(unitCoordinatorController.createStudent);
router
  .route('/:id')
  .get(unitCoordinatorController.getStudent)
  .patch(unitCoordinatorController.updateStudent)
  .delete(unitCoordinatorController.deleteStudent);
//-------------------------------------------//
module.exports = router;
