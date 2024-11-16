const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema.graphql');
const resolvers = require('./resolvers/index');
const { graphqlUploadExpress } = require('graphql-upload');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path'); // Pour manipuler les chemins de fichiers
const app = express();
const prisma = new PrismaClient();
const { makeExecutableSchema } = require('graphql-tools');
// Création du schéma exécutable
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Middleware pour gérer les uploads de fichiers
app.use(graphqlUploadExpress());

// Configuration du serveur Apollo
const server = new ApolloServer({
    uploads: false, // Si vous n'utilisez pas le téléchargement de fichiers
    schema,
    context: (request) => ({ ...request, prisma }),
    playground: true,
    introspection: true,
});

// Appliquer le middleware Apollo sur l'application Express
server.applyMiddleware({ app, bodyParser: bodyParser.json() });

// Middleware pour servir les fichiers statiques (comme le PDF)
app.use('/downloads', express.static(path.join(__dirname, 'const')));

 //Middleware pour servir les fichiers statiques (comme les images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Démarrer le serveur
app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on http://localhost:4000/graphql");
});
