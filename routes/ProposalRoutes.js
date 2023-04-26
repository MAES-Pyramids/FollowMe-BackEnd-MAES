const express = require('express');
const authController = require('../controllers/authController');
const proposalController = require('../controllers/proposalController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
//-------------Users Routes-----------------//
//--------------Active User-----------------//
router.patch(
  '/:id/acceptProposal',
  authController.protect,
  proposalController.acceptProposal
);
router.patch(
  '/:id/rejectProposal',
  authController.protect,
  proposalController.rejectProposal
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
