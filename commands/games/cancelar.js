module.exports = {
  name: "cancelar",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;
    global.juegos = global.juegos || {};

    if (!global.juegos?.[groupId]) {
      return await ctx.reply("❌ No hay un juego de ahorcado activo en este grupo.");
    }

    delete global.juegos[groupId];
    return await ctx.reply("🛑 El juego de ahorcado ha sido cancelado.");
  }
};
