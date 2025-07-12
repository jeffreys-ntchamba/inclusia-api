const getTicker = async (parent, args, context) => {
    try {
      return await context.prisma.ticker.findUnique({
        where: { id: 1 },
      });
    } catch (e) {
      console.error("Erreur lors de la récupération du ticker :", e.message);
      return null;
    }
  };
module.exports = {
    getTicker,
};  