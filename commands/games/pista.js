module.exports = {
  name: "pista",
  permissions: {
    group: true
  },
  desc: "Revela una letra aleatoria de la palabra",
  code: async (ctx) => {
    const groupId = ctx.chat;
    global.juegos = global.juegos || {};
    const juego = global.juegos?.[groupId];

    if (!juego) {
      return await ctx.reply("❌ No hay un juego de ahorcado activo.");
    }

    const letrasDisponibles = juego.palabra
      .split("")
      .filter((l, i) => juego.progreso[i] === "_" && !juego.letras.includes(l));

    if (letrasDisponibles.length === 0) {
      return await ctx.reply("⚠️ Ya no hay letras disponibles para dar como pista.");
    }

    const letraSugerida = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];

    if (juego.letras.includes(letraSugerida)) {
      return await ctx.reply("⚠️ La letra sugerida ya fue usada. Intenta nuevamente.");
    }

    juego.letras.push(letraSugerida);

    juego.palabra.split("").forEach((c, i) => {
      if (c === letraSugerida) {
        juego.progreso[i] = letraSugerida;
      }
    });

    const progresoStr = juego.progreso.join(" ");
    const letrasUsadas = juego.letras.join(", ");

    if (!juego.progreso.includes("_")) {
      delete global.juegos[groupId];
      return await ctx.reply(`🕵️ Letra revelada: "${letraSugerida}"
🎉 ¡Ganaron! La palabra era: "${juego.palabra}"`);
    }

    return await ctx.reply(
      `🕵️ Letra revelada: "${letraSugerida}"
Palabra: ${progresoStr}
Letras usadas: ${letrasUsadas}`
    );
  }
};
