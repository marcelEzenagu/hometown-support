const knex = require('../../db')


const getUserByEmail = async(req, res,next) => {
    const {email} = req.body
  const user = await knex("users")
    .where("email", email)
    .first()

    if(!user) {
        return res.status(200).send({message:"User not found"})
    }
    req.user = user
    next()
}


async function verifySupportToken(token) {
  //for verifying every single web request
  if (token !== "invalidated") {
    //first check token validity in DB
    return knex("support_tokens")
      .where("token", token)
      .first()
      .then((tokenData) => {
        //retrieve email from token
        if (tokenData !== undefined) {
          //todo: check if token is still fresh

          //check user from user table
          return knex("support")
            .where("email", tokenData.email)
            .first()
            .then((user) => {
              //check if user exists in DB
              if (user !== undefined) {
                return user;
              } else return "invalid_user";
            });
        } else return "invalid_token";
      });
  } else return "invalid_token";
}


const saveFrequentActivityDetails = async(s_email,u_email,slug,type,description) => {

                              await knex("support_activities").insert({
                                support_by: s_email,
                                account: u_email,
                                slug,
                                // : "fund-transfer",
                                type,
                                // : "Fund Transfer",
                                description,
                                // :
                                // "User fund transfer from " +
                                // oldAccount.email +
                                // " to " +
                                // newAccount.email,
                                // amount: oldAccount.available_bal,
                              })
}

    module.exports = {getUserByEmail, verifySupportToken, saveFrequentActivityDetails}