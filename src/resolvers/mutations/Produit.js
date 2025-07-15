const path = require('path');
const fs = require('fs');
const axios = require('axios'); 
  
  /*const addProduit = async (parent, args, context) => {
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
  };*/


  const addProduit = async (parent, args, context) => {
    const {
      chiffreAffaireMoyen,
      notationGprIndex,
      chiffreAffairesPrevisionnel,
      tauxRentabilitePrevisionnel,
      besoinDeCapital,
      partDisponible,
      coursUnePart,
      siege,
      name,
      image, // Peut être un fichier GraphQL Upload ou une URI locale
      categorie,
      secteur,
      description
    } = args;
  
    try {
      let imagePath = null;
  
      if (image) {
        // Vérifie si l'image est un fichier GraphQL Upload ou une URI locale
        if (typeof image === 'object' && image.promise) {
          // Gère les fichiers envoyés en tant qu'objet GraphQL Upload
          const resolvedImage = await image.promise;
          const { createReadStream, filename } = resolvedImage;
  
          if (filename) {
            const uploadDir = path.join(__dirname, '../../uploads');
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
  
            const filePath = path.join(uploadDir, filename);
            const stream = createReadStream();
  
            await new Promise((resolve, reject) => {
              const writeStream = fs.createWriteStream(filePath);
              stream.pipe(writeStream);
              writeStream.on('finish', resolve);
              writeStream.on('error', reject);
            });
  
            // Chemin relatif pour la base de données
            imagePath = `/uploads/${filename}`;
          } else {
            console.error("Erreur : Le nom de fichier (filename) est indéfini.");
          }
        } else if (typeof image === 'string' && image.startsWith('file://')) {
          // Gère les URI locales (envoyées depuis une application mobile)
          const uploadDir = path.join(__dirname, '../../uploads');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
  
          const localFilePath = image.replace('file://', ''); // Supprime le préfixe 'file://'
          const filename = path.basename(localFilePath);
          const destinationPath = path.join(uploadDir, filename);
  
          fs.copyFileSync(localFilePath, destinationPath);
  
          // Chemin relatif pour la base de données
          imagePath = `/uploads/${filename}`;
        } else {
          console.error("Erreur : Format d'image non pris en charge.");
        }
      } else {
        console.error("Erreur : L'image n'est pas fournie dans la requête.");
      }
  
      // Créer le produit dans la base de données avec le chemin de l'image
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
          image: imagePath,
          statut: false,
          categorie,
          secteur,
          description
        },
      });
  
      return createProduit;
    } catch (e) {
      console.error('Error :', e);
      throw new Error("Erreur lors de la création du produit");
    }
  };

  
  const updateProduit = async (parent, args, context) => {
    const { produiId,name, chiffreAffaireMoyen,notationGprIndex,chiffreAffairesPrevisionnel,tauxRentabilitePrevisionnel,besoinDeCapital,partDisponible,coursUnePart,siege, image,categorie,secteur,description} = args
    try{
    let imagePath = null;
  
      // Attendre la résolution de la Promise image
      if (image) {
        const resolvedImage = await image.promise; // Attendre que la Promise contenue dans l'image soit résolue
        const { createReadStream, filename } = resolvedImage;
  
        console.log("Resolved Filename:", filename); // Log du nom du fichier pour vérifier qu'il est défini
  
        if (filename) {
          const uploadDir = path.join(__dirname, './', 'uploads');
          
          // Assurez-vous que le dossier 'uploads' existe
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
  
          const filePath = path.join(uploadDir, filename);
          const stream = createReadStream();
          await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);
            stream.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
          });
  
          // Chemin relatif pour sauvegarder dans la base de données
          imagePath = `/uploads/${filename}`;
        } else {
          console.error("Erreur : Le nom de fichier (filename) est indéfini.");
        }
      } else {
        console.error("Erreur : L'image n'est pas fournie dans la requête.");
      }
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
            siege:siege,
            categorie:categorie,
            secteur:secteur,
            description:description
            
            

        }
    })
    
    return produit
  }catch (e) {
    console.error('Error:', e);
  }}
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
  
  
  module.exports = {
    addProduit,
    achiveProduit,
    updateProduit,
    addCommande

  };