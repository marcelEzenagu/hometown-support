const express = require('express')
const { getPdf, rangeTransaction } = require('../controllers/accountStatement')

const accountStatementRouter = express.Router()

accountStatementRouter.post("/",
                // rangeTransaction, 
                getPdf 
            )

module.exports = accountStatementRouter
