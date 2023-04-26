const express = require('express');
const authController = require('../controllers/authController');
const proposalController = require('../controllers/proposalController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
//-------------Users Routes-----------------//
//--------------Active User-----------------//
const authDoctorMiddleware = [
  authController.protect,
  authController.restrictTo('Doctor')
];

router.patch(
  '/:id/acceptProposal',
  ...authDoctorMiddleware,
  proposalController.acceptProposal
);

router.patch(
  '/:id/rejectProposal',
  ...authDoctorMiddleware,
  proposalController.rejectProposal
);

router.post(
  '/:id/evaluateProposal',
  ...authDoctorMiddleware,
  proposalController.evaluateProposal
);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(proposalController.getAllProposals)
  .post(proposalController.createProposal);
router
  .route('/:id')
  .get(proposalController.getProposal)
  .patch(proposalController.updateProposal)
  .delete(proposalController.deleteProposal);
//-------------------------------------------//
module.exports = router;
