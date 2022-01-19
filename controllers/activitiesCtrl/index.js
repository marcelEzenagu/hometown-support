const knex = require("../../db");
const {verifySupportToken, saveFrequentActivityDetails} = require("../supportUser/supportUserCtrl");

const unsetBVN = async(req, res) => {
    const user = req.user
     const {token} = req.body
    const supportUser = await verifySupportToken(token)
   
    let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
   
    try {
       await  knex("users")
            .where("email", user.email)
            .first()
            .update({ bvn : null})
            .then(async(_) => {
                 await saveFrequentActivityDetails(supportUser.email,
                    user.email, slug, supportType, description
                    )
   
                return  res.status(200).send({
                    success: "true",
                    message: "BVN successfully updated."
                });
            })
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

const discardLoan =  async(req, res) => {
    // get email
// check users table for user
// set counter to 0
// set loan_discarded_at = null
    const user = req.user
   const {token} = req.body
    const supportUser = await verifySupportToken(token)
     
     let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
   
   
   await knex("users")
              .where("email", user.email)
              .update({
                  loan_discarded_counter: 0,
                  loan_discarded_at: null,
                })
                .then(async(_) => {
                     await saveFrequentActivityDetails(supportUser.email,
                        user.email,
                        slug, supportType, description
                            )
   
                return  res.status(200).send({
                    success: "true",
                    message: "Loan counter Reset successful.",
                  });
              })
         
}

const stopBlockLoan = async(req, res) => {
    const user = req.user
    const {token} = req.body
    const supportUser = await verifySupportToken(token)
    let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
   
try {
      await  knex("users")
        .where("email", user.email)
        .update({ stop_block_loan_offer : 1})
        .then(async(_) => {
             await saveFrequentActivityDetails(supportUser.email,
                                    user.email,
                                    slug,supportType, description
                                        )
            return  res.status(200).send({
                success: "true",
                message: "Location and Name block successful."
            });
        })
        .catch((err) => console.log(err))
        
       

} catch (error) {
    console.log(error)
}
}

const alternateEmail = async(req, res) => {
    const {altEmail,token} = req.body
    const supportUser = await verifySupportToken(token)
    const user = req.user
    let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
    
    try {
        if(!altEmail) {
            return res.status(200).send({message:"Enter an alternate email"})
        }
        if(altEmail == user.email) {
            return res.status(200).send({message:"The emails cannot be the same."})
        }
        await  knex("users")
            .where("email", user.email)
            .update({ alt_email : altEmail })
            .then(async(_) => {
                await saveFrequentActivityDetails(supportUser.email,
                    user.email,
                    slug,supportType, description
                        )

                return  res.status(200).send({
                    success: "true",
                    message: "Alternate email successfully added."
                    });
            })
           .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

const bvnPhoneUpdate = async(req, res) => {
    const user = req.user
    const {token} = req.body
    const supportUser = await verifySupportToken(token)
   
    let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
    await saveFrequentActivityDetails(supportUser.email,
                                    user.email,
                                    slug,supportType, description
                                        )
   
    try {
       await  knex("users")
            .where("email", user.email)
            .first()
            .update({ skip_nin_phone_cfm : 0,
                    skip_bvn_phone_cfm: 0 })
            .then((_) => {
                return  res.status(200).send({
                    success: "true",
                    message: "BVN/NIN successfully updated."
                });
            })
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

const overrideLoan = async(req, res) => {
    const user = req.user
    const {token} = req.body
    const supportUser = await verifySupportToken(token)
   
    let slug = req._parsedUrl.path.split("/")[1]
    let supportType = req._parsedUrl.path.split("/")[1]
    let description = `${req._parsedUrl.path.split("/")[1]} activity for ${user.email} by ${supportUser.email}`
    
    try {
        // check if active loan && amount_paid >= repayment_amount
        const loan = await  knex("loans")
        .where("email", "=", user.email)
        .where("amount_paid", ">=", "repayment_amount")
        .andWhere( function() {
            this.where("status", 1).orWhere("status", 0)})
        if (loan.length > 0) {
            
            const userLoan = await  knex("loans")
                .where({"email": user.email})
                .update({ status : 0,
                    balance: 0 })
                .then( async(_) => {
                const saved =  await saveFrequentActivityDetails(supportUser.email,
                                    user.email,
                                    slug,supportType, description
                                        )
                    
                    return  res.status(200).send({
                        success: "true",
                        message: "Loan override successful."
                    });
                })
                .catch((err) => console.log(err))
            
        } else{

            return  res.status(200).send({message:"No loan to override."})
        }
            //     /
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {
    unsetBVN,
    discardLoan,
    stopBlockLoan,
    alternateEmail,
    bvnPhoneUpdate,
overrideLoan}