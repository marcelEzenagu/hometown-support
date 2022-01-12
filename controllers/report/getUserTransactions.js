const knex = require("../../db")
const moment = require('moment')
const getUserBalance = require("./getUserBalance")
const numberFormat = require('../../services/numberFormat')
const groupItemsByData = require("../../services/dateGrouping")
const dataGrouping = require("../../services/dataGrouping")

const getUserTransactions = async({start_date, end_date, userEmail}) => {
    //  get transacions relative to start and end date
    const transactions = await
        knex
        .select("trx.*", "user.fname", "user.lname","user.phone AS account_number")
        .from("transactions AS trx")
        .join("users AS user", "user.email", "trx.email")
        .orderBy("created_at")
         .modify((query) => {
            start_date ? query.where('trx.created_at', '>=', moment(start_date).format("YYYY-MM-DDT00:00:00Z")) : null

            end_date ? query.where('trx.created_at', '<=', moment(end_date).format("YYYY-MM-DDT00:00:00Z")) : null
            query.where('trx.email', "=", userEmail)
        })
        // assign user and delivery to statement object
        let statement = {items:[],userDetails:{}}
        let cashFlow = {credits : [], debits:[]}
        
        let {items, userDetails} = statement
        let {credits, debits} = cashFlow
         let {available_bal , fname,lname,phone,email} = await getUserBalance(userEmail)
         userDetails.name = `${lname} ${fname}`
         userDetails.account_number = phone
         userDetails.accountBalance = numberFormat(available_bal)
         userDetails.email = email
        

         if(transactions.length > 0) {
             transactions.map( trans => {
                 const report = {}
                 
                 report.date = moment(trans.created_at).format("YYYY-MM-DD")
                 report.remark = trans.description
                 report.debit = (trans.direction === "debit") ? numberFormat(trans.amount) : ""
                 report.type = (trans.direction === "credit") ? "Credit" : "Debit"
                report.credit = (trans.direction === "credit") ? numberFormat(trans.amount) : ""
                report.balance = numberFormat((Number(trans.balance) + trans.balance2));
                
                report.reference = `${trans.fname}-${moment(trans.created_at).seconds()}`
                
              
                // datedList.forEach
                // check if date already exists in array
                // if it already exists add it to a 
                // add date to array


                items.push(report)
                    
            if (trans.direction === "credit") {
                credits.push(Number(trans.amount))}
                if (trans.direction === "debit") {
                    debits.push(Number(trans.amount))
                }
            })

            // let datedList =  groupItemsByData(transactions)
            // statement.items = dataGrouping(transactions)
            
             
         }
      credits.length >= 1 ?  statement.totalCredit = numberFormat(credits?.reduce((a,b) => (a+b))) : 0;
      debits.length >= 1 ?  statement.totalDebit = numberFormat(debits?.reduce((a,b) => (a+b))) : 0;
        
      return statement
    }

    module.exports = getUserTransactions