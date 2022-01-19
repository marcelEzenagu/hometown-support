const express = require('express');
const {getUserByEmail} = require('../controllers/supportUser/supportUserCtrl');
const {bvnPhoneUpdate,discardLoan,stopBlockLoan,alternateEmail,unsetBVN, overrideLoan} = require('../controllers/activitiesCtrl')
const knex = require('../db')
const activityRouter = express.Router()


activityRouter.patch("/loan_discarded_counter",getUserByEmail,discardLoan);

activityRouter.patch("/stop_block_loan", getUserByEmail,stopBlockLoan );

activityRouter.patch("/alt_email",getUserByEmail,alternateEmail );

activityRouter.patch("/override_loan",getUserByEmail, overrideLoan);

activityRouter.patch("/bvn_unset",getUserByEmail, unsetBVN );

activityRouter.patch("/bvn_phone_update",getUserByEmail, bvnPhoneUpdate );

module.exports = activityRouter
