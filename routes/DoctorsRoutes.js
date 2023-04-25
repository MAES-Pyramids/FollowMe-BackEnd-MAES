const express = require('express');
const doctorController = require('../controllers/doctorController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
router.route('/:id/proposals').post(doctorController.SendDoctorProposals);
router.route('/me/proposals').get(doctorController.GetAllProposals);
//-------------------------------------------//
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
