const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { userSeeds } = require('./seed/user.js');



async function main() {
  await userSeeds();
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
