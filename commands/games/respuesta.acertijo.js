module.exports = {
  name: "responder",
  category: "diversion",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;
    global.acertijos = global.acertijos || {};

    const juego = global.acertijos[groupId];

    if (!juego) {
      return await ctx.reply("❌ No hay un acertijo activo. Usa `.acertijo` para comenzar uno.");
    }

    const respuestaUsuario = ctx.args.join(" ").toLowerCase();

    if (!respuestaUsuario) {
      return await ctx.reply("✏️ Debes escribir una respuesta. Ejemplo: `.responder el silencio`");
    }

    if (respuestaUsuario === juego.respuesta) {
      delete global.acertijos[groupId];
      return await ctx.reply(`🎉 ¡Correcto! La respuesta era: *${juego.respuesta}*`);
    }

    juego.intentos++;

    if (juego.intentos >= 5) {
      const solucion = juego.respuesta;
      delete global.acertijos[groupId];
      return await ctx.reply(`❌ ¡Incorrecto! Has alcanzado el máximo de intentos.\n📌 La respuesta correcta era: *${solucion}*`);
    }

    return await ctx.reply(`❌ Incorrecto. Intentos restantes: *${5 - juego.intentos}*`);
  }
};
