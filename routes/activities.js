const express = require('express');
const getUserByEmail = require('../controllers/user/userCtrl');
const knex = require('../db')
const activityRouter = express.Router()

activityRouter.patch("/loan_discarded_counter",getUserByEmail, async(req, res) => {
    // get email
// check users table for user
// set counter to 0
// set loan_discarded_at = null
    const user = req.user
   
   await knex("users")
              .where("email", user.email)
              .update({
                  loan_discarded_counter: 0,
                  loan_discarded_at: null,
                })
                .then((_) => {
                return  res.status(200).send({
                    success: "true",
                    message: "Loan counter .",
                  });
              })
         
});

activityRouter.patch("/stop_block_loan", getUserByEmail, async(req, res) => {
    const user = req.user
    // getUserByEmail(userEmail)
try {
      await  knex("users")
        .where("email", user.email)
        .update({ stop_block_loan_offer : 1})
        .then((_) => {
            return  res.status(200).send({
                success: "true",
                message: "Location and Name block successful."
            });
        })
        .catch((err) => console.log(err))
        
       

} catch (error) {
    console.log(error)
}
});



activityRouter.patch("/alt_email",getUserByEmail, async(req, res) => {
    const {altEmail} = req.body
    const user = req.user
    try {
        if(!altEmail) {
            return res.status(400).send({message:"Enter an alternate email"})
        }
        if(altEmail == user.email) {
            return res.status(400).send({message:"The emails cannot be the same."})
        }
        await  knex("users")
            .where("email", user.email)
            .update({ alt_email : altEmail })
            .then((_) => {
                return  res.status(200).send({
                    success: "true",
                    message: "Alternate email successfully added."
                });
            })
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
})



activityRouter.patch("/override_loan",getUserByEmail, async(req, res) => {
    const user = req.user
    try {
       const userLoan = await  knex("loans")
            .where("email", user.email)
            .first()

            console.log("loan", userLoan)
            // .update({ status : 0,
            //         balance: 0 })
            // .then((_) => {
            //     return  res.status(200).send({
            //         success: "true",
            //         message: "Alternate email successfully added."
            //     });
            // })
            // .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
})

activityRouter.patch("/bvn_unset",getUserByEmail, async(req, res) => {
    const user = req.user
    try {
       await  knex("users")
            .where("email", user.email)
            .first()
            .update({ bvn : null})
            .then((_) => {
                return  res.status(200).send({
                    success: "true",
                    message: "BVN successfully updated."
                });
            })
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
})
activityRouter.patch("/bvn_phone_update",getUserByEmail, async(req, res) => {
    const user = req.user
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
})



module.exports = activityRouter
