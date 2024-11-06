const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema.graphql');
const resolvers = require('./resolvers/index');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path'); // Pour manipuler les chemins de fichiers
const app = express();
const prisma = new PrismaClient();
const { makeExecutableSchema } = require('graphql-tools');

// Création du schéma exécutable
const schema = makeExecutableSchema({ typeDefs, resolvers });

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


// Démarrer le serveur
app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on http://localhost:4000/graphql");
});
