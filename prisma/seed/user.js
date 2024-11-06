const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const adminCreate = async ({ name, email, phone, password, statut }) => {
  let user = await prisma.fournisseur.create({
    data: {
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
      statut,
    },
  });
};

const userSeeds = async () => {
  const users = [
    {
      name: "Admin Light",
      email: "lightMarket@gmail.com",
      password: "adminLight",
      phone: "699999999",
      statut: false,
    },
  ];

  await Promise.all(
    users.map(async (user) => {
      await adminCreate(user);
    })
  );
};

module.exports = {
  userSeeds,
};
