
  const addProduit = async (parent, args, context) => {
    const {chiffreAffaireMoyen,notationGprIndex,chiffreAffairesPrevisionnel,tauxRentabilitePrevisionnel,besoinDeCapital,partDisponible,coursUnePart,siege, name, image} = args;
    try {
      const createProduit = await context.prisma.produit.create({
        data: {
          name,
          chiffreAffaireMoyen,
          notationGprIndex,
          chiffreAffairesPrevisionnel,
          tauxRentabilitePrevisionnel,
          besoinDeCapital,
          partDisponible,
          coursUnePart,
          siege,
          image,
          statut:false,
        }
      });
        return createProduit;
      
    } catch (e) {
      console.error('Error :', e);
    }
  };
  const addCommande = async (parent, args, context) => {
    const { produitId,quantite,userId} = args;
    try {
      const createCommande = await context.prisma.commande.create({
        data: {
          quantite,
          
          produit: { connect: { id: parseFloat(produitId) } },
          user: { connect: { id: parseFloat(userId) } },
        },
      });
      return createCommande;
    } catch (e) {
      console.error('Error:', e);
    }
  };
  const achiveProduit = async (parent, args, context) => {
    const { produiId} = args
    let produit = await context.prisma.produit.findUnique({where:{id: parseFloat(produiId)}})
    produit = await context.prisma.produit.update({
        where:{
            id: parseFloat(produiId)
        },
        data: {
            statut:true,
        }
    })
    
    return produit
  }
  const updateProduit = async (parent, args, context) => {
    const { produiId,name, chiffreAffaireMoyen,notationGprIndex,chiffreAffairesPrevisionnel,tauxRentabilitePrevisionnel,besoinDeCapital,partDisponible,coursUnePart,siege, image} = args
    let produit = await context.prisma.produit.findUnique({where:{id: parseFloat(produiId)}})
    produit = await context.prisma.produit.update({
        where:{
            id: parseFloat(produiId)
        },
        data: {
            image:image,
            name:name,
            chiffreAffaireMoyen:chiffreAffaireMoyen,
            notationGprIndex:notationGprIndex,
            chiffreAffairesPrevisionnel:chiffreAffairesPrevisionnel,
            tauxRentabilitePrevisionnel:tauxRentabilitePrevisionnel,
            besoinDeCapital:besoinDeCapital,
            partDisponible:partDisponible,
            coursUnePart:coursUnePart,
            siege:siege
            
            

        }
    })
    
    return produit
  }
  
  module.exports = {
    addProduit,
    achiveProduit,
    updateProduit,
    addCommande

  };