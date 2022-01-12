const knex = require('../db')
const getData = require('../services/createTable')
const createPdf = require('../services/createPdf')
const path = require('path')
const moment = require('moment')
const getPdfData = require('../services/createHtml')
const fs = require('fs')



const getPdf = async(req, res) => {
    console.log("request body:", req.body)
     const { start_date, end_date, userEmail} = req.body

    await getPdfData({start_date, end_date, userEmail}).then(err => {
        if (!err){
            createPdf()
            .then((err) => {
                if(!err){
                    const pdf = path.resolve('./pdf/build.pdf')
                    
                    // fs.readFile(pdf, (err, data) => {

                    //     // res.contentType("application/pdf")
                    //     res.download(data)
                    // })
                    // res.sendFile(pdf)
                    let file = fs.createReadStream(pdf)
                    file.pipe(res)
                }   
                        
            })
        }
    })


    
   // res.render('../views/pages/report', { items:trans})    
    // const docFile = await generatePdf(('../views/pages/report', { items:trans}))
    // res.set("Content-Type", "application/pdf")

    // res.send(docFile)

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