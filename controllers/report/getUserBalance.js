const knex = require("../../db")


const getUserBalance = async(userEmail) => {
    const {available_bal,fname,lname,phone,email} = await knex("users")
        .where("email", userEmail)
        .first()
         return {available_bal ,fname,lname,phone,email}

}

module.exports = getUserBalance