const figuras = [
  ` 
  
  
  
  
  `,
  `
  🧍
  `,
  `
  🧍
   |
  `,
  `
  🧍
   |
   O
  `,
  `
  🧍
   |
   O
   |
  `,
  `
  🧍
   |
   O
  /|
  `,
  `
  🧍
   |
   O
  /|\\
  `,
  `
  🧍
   |
   O
  /|\\
   |
  `,
  `
  🧍
   |
   O
  /|\\
   |
  / 
  `,
  `
  🧍
   |
   O
  /|\\
   |
  / \\
  `
];

module.exports = {
  name: "letra",
  category: "games",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;
    global.juegos = global.juegos || {};
    const juego = global.juegos?.[groupId];

    if (!juego) {
      return await ctx.reply("❌ No hay un juego de ahorcado en curso. Usa .ahorcado para iniciar uno.");
    }

    const letra = ctx.args[0]?.toLowerCase();
    if (!letra || letra.length !== 1 || !/^[a-záéíóúñ]$/i.test(letra)) {
      return await ctx.reply("❌ Debes escribir una letra válida. Ejemplo: .letra a");
    }

    if (juego.letras.includes(letra)) {
      return await ctx.reply(`⚠️ Ya usaron la letra "${letra}". Prueba otra.`);
    }

    let aciertos = 0;
    juego.palabra.split("").forEach((c, i) => {
      if (c === letra) {
        juego.progreso[i] = letra;
        aciertos++;
      }
    });

    juego.letras.push(letra);

    if (aciertos === 0) {
      juego.intentos--;
    }

    const figura = figuras[10 - juego.intentos];
    const progresoStr = juego.progreso.join(" ");
    const letrasUsadas = juego.letras.join(", ");
    const mensaje =
      (aciertos > 0 ? `✅ Bien! La letra "${letra}" está en la palabra.
` : `❌ La letra "${letra}" no está.`) +
      `
${figura}

Palabra: ${progresoStr}
Letras usadas: ${letrasUsadas}
Intentos restantes: ${juego.intentos}`;

    if (!juego.progreso.includes("_")) {
      delete global.juegos[groupId];
      return await ctx.reply(`🎉 ¡Felicidades! La palabra era "${juego.palabra}". ¡Ganaron el juego!`);
    }

    if (juego.intentos <= 0) {
      const palabraFinal = juego.palabra;
      delete global.juegos[groupId];
      return await ctx.reply(`💀 Se quedaron sin intentos. La palabra era: "${palabraFinal}".`);
    }

    return await ctx.reply(mensaje);
  }
};
