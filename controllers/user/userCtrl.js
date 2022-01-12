const knex = require('../../db')


const getUserByEmail = async(email) => {
    knex("users")
        .where("email", email)
        .select("lname", "fname")
        // .first()
        .then((user) => {
            // const data = {
            //     name: `${user.lname}" "`
            // }
            // return user
        })
    }

    module.exports = getUserByEmail