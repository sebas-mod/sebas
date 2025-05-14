const acertijos = [
  { pregunta: `🔍 *Acertijo 1:*\nSi me nombras, desaparezco. ¿Qué soy?`, respuesta: `El silencio` },
  { pregunta: `🧠 *Acertijo 2:*\nMe perteneces, pero otros me usan más que tú. ¿Qué soy?`, respuesta: `Tu nombre` },
  { pregunta: `🕵️ *Acertijo 3:*\nPuedes romperme sin tocarme ni decir una palabra. ¿Qué soy?`, respuesta: `Una promesa` },
  { pregunta: `🎭 *Acertijo 4:*\nCuanto más tomas de mí, más grande me vuelvo. ¿Qué soy?`, respuesta: `Un agujero` },
  { pregunta: `🧊 *Acertijo 5:*\nNo tengo vida, pero puedo morir si me tocas. ¿Qué soy?`, respuesta: `El hielo` },
  { pregunta: `🧩 *Acertijo 6:*\nEntre más hay, menos ves. ¿Qué es?`, respuesta: `La oscuridad` },
  { pregunta: `📚 *Acertijo 7:*\n¿Qué palabra se escribe incorrectamente en todos los diccionarios?`, respuesta: `Incorrectamente` },
  { pregunta: `🦉 *Acertijo 8:*\nVuelo sin alas, lloro sin ojos. ¿Qué soy?`, respuesta: `Las nubes` },
  { pregunta: `📦 *Acertijo 9:*\nEstá en el centro de gravedad, pero no tiene masa. ¿Qué es?`, respuesta: `La letra 'v'` },
  { pregunta: `🔥 *Acertijo 10:*\nTengo un solo ojo, pero no puedo ver. ¿Qué soy?`, respuesta: `Una aguja` },
  { pregunta: `⏳ *Acertijo 11:*\nTiene manos, pero no puede aplaudir. ¿Qué es?`, respuesta: `Un reloj` },
  { pregunta: `🌧️ *Acertijo 12:*\nEntre más seco, más moja. ¿Qué es?`, respuesta: `Una toalla` },
  { pregunta: `🪞 *Acertijo 13:*\nRefleja pero no habla. ¿Qué es?`, respuesta: `Un espejo` },
  { pregunta: `🧠 *Acertijo 14:*\nMientras más se comparte, más crece. ¿Qué es?`, respuesta: `El conocimiento` },
  { pregunta: `🚪 *Acertijo 15:*\nTiene cerradura pero no puerta. ¿Qué es?`, respuesta: `Un archivo encriptado` },
  { pregunta: `🔐 *Acertijo 16:*\nTiene claves pero no cerraduras. ¿Qué es?`, respuesta: `Un teclado` },
  { pregunta: `🧱 *Acertijo 17:*\n¿Qué se moja mientras seca?`, respuesta: `Una toalla` },
  { pregunta: `🪵 *Acertijo 18:*\nEntre más te llevas, más dejas atrás. ¿Qué es?`, respuesta: `Huellas` },
  { pregunta: `💭 *Acertijo 19:*\nNo se puede ver, ni tocar, pero llena una habitación. ¿Qué es?`, respuesta: `El silencio` },
  { pregunta: `📏 *Acertijo 20:*\nTiene pies pero no camina. ¿Qué es?`, respuesta: `Una regla` }
];

global.rondasAcertijo = global.rondasAcertijo || {};

module.exports = {
  name: "acertijo",
  category: "diversion",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;
    global.rondasAcertijo[groupId] = {
      acertijo: acertijos[Math.floor(Math.random() * acertijos.length)],
      intentos: 0
    };

    const pregunta = global.rondasAcertijo[groupId].acertijo.pregunta;
    await ctx.reply(`${pregunta}\n\nResponde al mensaje con tu respuesta usando: .respuesta <texto>`);
  }
};
