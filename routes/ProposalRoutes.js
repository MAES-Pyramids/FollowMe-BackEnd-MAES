const express = require('express');
const authController = require('../controllers/authController');
const proposalController = require('../controllers/proposalController');
const unitCoordinatorController = require('../controllers/unitCoordinatorController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
//-------------Users Routes-----------------//
//--------------Active User-----------------//
const doctorAuthDoctorMiddleware = [
  authController.protect,
  authController.restrictTo('Doctor')
];

router.patch(
  '/:id/acceptProposal',
  ...doctorAuthDoctorMiddleware,
  proposalController.acceptProposal
);

router.patch(
  '/:id/rejectProposal',
  ...doctorAuthDoctorMiddleware,
  proposalController.rejectProposal
);

router.post(
  '/:id/evaluateProposal',
  ...doctorAuthDoctorMiddleware,
  proposalController.evaluateProposal
);
//---------------Admin Routes---------------//
router.use(authController.protect, authController.restrictTo('SuperDoctor'));
router
  .route('/')
  .get(unitCoordinatorController.getAllProposals)
  .post(unitCoordinatorController.createProposal);
router
  .route('/:id')
  .get(unitCoordinatorController.getProposal)
  .patch(unitCoordinatorController.updateProposal)
  .delete(unitCoordinatorController.deleteProposal);
//-------------------------------------------//
module.exports = router;
