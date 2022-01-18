const knex = require('../../db')


const getUserByEmail = async(req, res,next) => {
    const {email} = req.body
  const user =  await knex("users")
    .where("email", email)
    .first()

    if(!user) {
        return res.status(404).send("User not found")
    }
    req.user = user
    next()
}

    module.exports = getUserByEmail