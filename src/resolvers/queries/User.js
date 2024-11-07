const UserList = async (parent, args, context) => {
  try {
    const userList = await context.prisma.user.findMany();

    // Ajouter un fallback pour les champs manquants, si nécessaire
    const processedUserList = userList.map(user => ({
      ...user,
      name: user.name || "No username", // Ajoute "Anonymous" si name est null ou undefined
    }));

    return processedUserList;
  } catch (e) {
    console.error("Error fetching user list:", e.message);

    // Renvoyer une erreur utilisateur-friendly
    throw new Error("Failed to fetch user list. Please try again later.");
  }
};



module.exports = {
  UserList,
}