const produits = async (parent, args, context, info) =>{
    const produit = await context.prisma.fournisseur({id: parent.id}).produit()
    return produit
}
module.exports = {
    produits,
}