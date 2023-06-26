
const info = async (parent, args, context) => {
    return "no info"
  }
  
  const { signUp,signIn} = require("./User")
  
  
  module.exports = {
    info,
    signUp,
    signIn
  }
  