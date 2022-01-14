const knex = require('../../db')


const getUserByEmail = async(email) => {
    knex("users")
        .where("email", email)
        .select("lname", "fname")
        // .first()
        .then(user => {
            const userData = `${user[0].lname} ${user[0].fname}`
            console.log("user is:", userData)
            return userData
        })
    }

    module.exports = getUserByEmail