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
  { pregunta: `🔥 *Acertijo 10:*\nTengo un solo ojo, pero no puedo ver. ¿Qué soy?`, respuesta: `Una aguja` }
];

global.acertijos = global.acertijos || {};

module.exports = {
  name: "acertijo",
  category: "diversion",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;
    const elegido = acertijos[Math.floor(Math.random() * acertijos.length)];

    const enviado = await ctx.reply(`${elegido.pregunta}\n\nResponde a este mensaje para intentar adivinar.`);

    global.acertijos[groupId] = {
      respuesta: elegido.respuesta.toLowerCase(),
      intentos: 0,
      mensajeId: enviado.key.id
    };
  }
};
