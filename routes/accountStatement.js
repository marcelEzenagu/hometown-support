const express = require('express')
const { getPdf} = require('../controllers/accountStatement')

const accountStatementRouter = express.Router()

accountStatementRouter.post("/", getPdf)

module.exports = accountStatementRouter
