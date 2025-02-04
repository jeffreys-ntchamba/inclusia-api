
const info = async (parent, args, context) => {
    return "no info"
  }
  
  const { signUp,signIn,DemandeAdhesion,achiveUser,UpdateUser,signInUser,UpdatePasswordAdmin} = require("./User")
  const { addProduit,achiveProduit,updateProduit,addCommande} = require("./Produit")
  
  
  module.exports = {
    info,
    signUp,
    signIn,
    addProduit,
    achiveProduit,
    updateProduit,
    addCommande,
    DemandeAdhesion,
    achiveUser,
    UpdateUser,
    signInUser,
    UpdatePasswordAdmin
  }
  