const bcrypt = require('bcryptjs');




const signUp = async (parent, args, context) => {
  console.log("signUp mutation");
  const { name, password,email,phone} = args;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  try {
    
    let fournisseur = await context.prisma.fournisseur.findUnique({ where: { phone} });
    if (fournisseur) {
      throw new Error("User already exist, try to login");
    }
    fournisseur = await context.prisma.fournisseur.create({
      data: {
        name,
        email,
        password:hashedPassword,
        phone,
        statut:false
      },
    }); 
   
    if (fournisseur) {
      return fournisseur;
    }
  } catch (e) {
    console.log("error",e);
    throw new Error(e);
  }
};

const DemandeAdhesion = async (parent, args, context) => {
  console.log("signUp mutation");
  const { phone, email } = args;

  // Validation des entrées
  if (!phone || !email) {
    throw new Error("Le téléphone et l'email sont obligatoires.");
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const user = await context.prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });

    if (user) {
      throw new Error("Un utilisateur avec ce téléphone ou cet email existe déjà.");
    }

    // Crée un nouvel utilisateur
    const newUser = await context.prisma.user.create({
      data: {
        phone,
        email,
        statut: false,
      },
    });

    // Génère un token temporaire pour sécuriser le téléchargement
    const token = generateDownloadToken(newUser.id); // À implémenter
    const downloadEndpoint = `${context.req.protocol}://${context.req.get('host')}/download-file?token=${token}`;

    return {
      id: newUser.id,
      user: newUser,
      downloadUrl: downloadEndpoint, // Renvoie un endpoint sécurisé pour le téléchargement
    };
  } catch (e) {
    console.error("Erreur lors de l'inscription :", e.message);
    throw new Error("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
  }
};

// Fonction pour générer un token de téléchargement (exemple avec JWT)
const generateDownloadToken = (userId) => {
  const jwt = require('jsonwebtoken');
  const secret = 'votre-secret'; // Remplacez par une clé secrète forte
  const token = jwt.sign({ userId, file: 'Formulaire_de_demande_d_adhésion.pdf' }, secret, { expiresIn: '5m' }); // Expire après 5 minutes
  return token;
};




const achiveUser = async (parent, args, context) => {
  const { userId} = args
  let user = await context.prisma.user.findUnique({where:{id: parseFloat(userId)}})
  user = await context.prisma.user.update({
      where:{
          id: parseFloat(userId)
      },
      data: {
          statut:true,
      }
  })
  
  return user
}
const UpdateUser = async (parent, args, context) => {
  console.log("signUp mutation");
  const { userId, password, name } = args;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    let user = await context.prisma.user.findUnique({ where: { id: parseFloat(userId) } });

    if (!user) {
      throw new Error("User not found");
    }
    const existingUser = await context.prisma.user.findFirst({
      where: {
        name: name,
        id: { not: parseFloat(userId) },
      },
    });

    if (existingUser) {
      throw new Error("User name existant");
    }
    const userUpdate = await context.prisma.user.update({
      where: {
        id: parseFloat(userId),
      },
      data: {
        password: hashedPassword,
        name: name,
      },
    });

    return userUpdate;
  } catch (e) {
    throw new Error(e.message);
  }
};

const signIn = async (parent, args, context) => {
  const { name, password } = args;
  try {
    const fournisseur = await context.prisma.fournisseur.findUnique({
      where: {
        name,  
      },
    });
   
    if (!fournisseur) throw new Error("vous n'etes pas membre");
    let passwordsMatch = true;
    if (password) {
      passwordsMatch = await bcrypt.compare(password, fournisseur.password);
    }
    if (password && !passwordsMatch) {
      throw new Error("Mot de passe incorrect");
    }
    if(fournisseur){

    return fournisseur;}
    else
    throw new Error("L'utilisateur n'existe pas")
  } catch (e) {
    console.log("error",e);
    throw new Error(e);
  }
};
const signInUser = async (parent, args, context) => {
  const { name, password } = args;
  try {
    const user = await context.prisma.user.findUnique({
      where: {
        name  
      },
    });
    if (!user) throw new Error("vous n'etes pas membre");
    let passwordsMatch = true;
    if (password) {
      passwordsMatch = await bcrypt.compare(password, user.password);
    }
    if (password && !passwordsMatch) {
      throw new Error("Mot de passe incorrect");
    }
    if(user){

    return user;}
    else
    throw new Error("L'utilisateur n'existe pas")
  } catch (e) {
    console.log("error",e);
    throw new Error(e);
  }
};

const UpdatePasswordAdmin = async (parent, args, context) => {
  const { userId, password } = args;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  try {
    let Fournisseur = await context.prisma.fournisseur.findUnique({ where: { id: parseFloat(userId) } });

    if (!Fournisseur) {
      throw new Error("Admin not found");
    }
    else
   { const fournisseurUpdate = await context.prisma.fournisseur.update({
      where: {
        id: parseFloat(userId),
      },
      data: {
        password: hashedPassword,
      },
    });

    return fournisseurUpdate;}
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = {
  signUp,
  signIn,
  signInUser,
  DemandeAdhesion,
  UpdateUser,
  achiveUser,
  UpdatePasswordAdmin
};