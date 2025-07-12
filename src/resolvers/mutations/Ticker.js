const upsertTicker = async (parent, args, context) => {
    const { text, duration = 10000 } = args;
  
    try {
      const ticker = await context.prisma.ticker.upsert({
        where: { id: 1 },
        update: { text, duration },
        create: { id: 1, text, duration },
      });
  
      return ticker;
    } catch (e) {
      console.error("Erreur lors du upsert du ticker :", e.message);
      throw new Error("Échec de la mise à jour du ticker");
    }
  };
module.exports = {
    upsertTicker,}  