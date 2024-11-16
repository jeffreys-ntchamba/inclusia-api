
const info = async (parent, args, context) => {
  return "no info"
}
const {UserList} = require("./User")
const {produitList, commandeForUser,commandeList} = require("./Produit")



module.exports = {
  info,
  UserList,
  produitList,
  commandeForUser,
  commandeList
}
