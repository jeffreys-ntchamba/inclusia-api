

const commandeForUser = async (parent, args, context) => {
  const {userId} = args
  try{
    const commandes= await context.prisma.commande.findMany({where:{
      userId: parseFloat(userId)
    }})

    return commandes
}
catch(e){
  throw new Error(e)
}
}
const commandeList = async (parent, args, context) => {
  try{
  const commandeList= await context.prisma.commande.findMany()
  return commandeList
}
catch(e){
  console.log("error",e)
  throw new Error(e)
  
}
}
const produitList = async (parent, args, context) => {
  try{
  const produitList= await context.prisma.produit.findMany()
  return produitList
}
catch(e){
  console.log("error",e)
  throw new Error(e)
  
}
}
module.exports = {
    produitList,
    commandeForUser,
    commandeList
}