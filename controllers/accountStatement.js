const knex = require('../db')
const createPdf = require('../services/createPdf')
const path = require('path')
const moment = require('moment')
const getPdfData = require('../services/createHtml')
const getData = require('../services/createTable')
const fs = require('fs')



const getPdf = async(req, res) => {
    // console.log("request body:", req.body)0
     const { start_date, end_date, userEmail} = req.body
    await getPdfData({start_date, end_date, userEmail}).then(err => {
        if (!err){
            createPdf()
            .then((err) => {
                if(!err){
                    const pdf = path.resolve('./services/pdf/statement.pdf')
                    let file = fs.createReadStream(pdf)
                    file.pipe(res)
                }   
                        
            })
        }
    })
}


const rangeTransaction = async(req, res, next) => {
    const { start_date, end_date} = req.body

  const data = await knex
        .select("trx.*", "user.fname", "user.lname","user.phone AS account_number")
        .from("transactions AS trx")
        .join("users AS user", "user.email", "trx.email")
        .orderBy("created_at")    
        .modify((query) => {
            start_date ? query.where('trx.created_at', '>=', moment(start_date).format("YYYY-MM-DDT00:00:00Z")) : null

            end_date ? query.where('trx.created_at', '<=', moment(end_date).format("YYYY-MM-DDT00:00:00Z")) : null
        })

  console.log("data:", data)

}
module.exports = {getPdf,
     rangeTransaction
    }