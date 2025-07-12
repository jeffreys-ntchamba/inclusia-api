
const info = async (parent, args, context) => {
  return "no info"
}
const {UserList} = require("./User")
const {produitList, commandeForUser,commandeList,produitsParCategorie} = require("./Produit")
const {getTicker} = require("./Ticker")






module.exports = {
  info,
  UserList,
  produitList,
  commandeForUser,
  commandeList,
  getTicker,
  produitsParCategorie
}
