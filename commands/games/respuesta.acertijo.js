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

    // Validar si hay juego activo
    if (!juego || !juego.mensajeId) {
      return;
    }

    // Verificar que estén respondiendo al mensaje del acertijo
    const respuestaId = ctx.msg?.contextInfo?.stanzaId;
    if (respuestaId !== juego.mensajeId) {
      return;
    }

    const texto = ctx.text?.toLowerCase().trim();
    if (!texto) return;

    if (texto === juego.respuesta.toLowerCase()) {
      delete global.acertijos[groupId];
      return await ctx.reply(`🎉 ¡Correcto! La respuesta era: *${juego.respuesta}*`);
    }

    juego.intentos++;

    if (juego.intentos >= 5) {
      const solucion = juego.respuesta;
      delete global.acertijos[groupId];
      return await ctx.reply(`❌ ¡Incorrecto! Se acabaron los intentos.\n📌 La respuesta correcta era: *${solucion}*`);
    }

    return await ctx.reply(`❌ Incorrecto. Intentos restantes: *${5 - juego.intentos}*`);
  }
};
