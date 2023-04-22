const express = require('express');
const proposalController = require('../controllers/proposalController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
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
