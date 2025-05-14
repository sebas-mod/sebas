const acertijos = [
  { pregunta: `🔍 *Acertijo 1:*
Si me nombras, desaparezco. ¿Qué soy?`, respuesta: `El silencio` },
  { pregunta: `🧠 *Acertijo 2:*
Me perteneces, pero otros me usan más que tú. ¿Qué soy?`, respuesta: `Tu nombre` },
  { pregunta: `🕵️ *Acertijo 3:*
Puedes romperme sin tocarme ni decir una palabra. ¿Qué soy?`, respuesta: `Una promesa` },
  { pregunta: `🎭 *Acertijo 4:*
Cuanto más tomas de mí, más grande me vuelvo. ¿Qué soy?`, respuesta: `Un agujero` },
  { pregunta: `🧊 *Acertijo 5:*
No tengo vida, pero puedo morir si me tocas. ¿Qué soy?`, respuesta: `El hielo` },
  { pregunta: `🧩 *Acertijo 6:*
Entre más hay, menos ves. ¿Qué es?`, respuesta: `La oscuridad` },
  { pregunta: `📚 *Acertijo 7:*
¿Qué palabra se escribe incorrectamente en todos los diccionarios?`, respuesta: `Incorrectamente` },
  { pregunta: `🦉 *Acertijo 8:*
Vuelo sin alas, lloro sin ojos. ¿Qué soy?`, respuesta: `Las nubes` },
  { pregunta: `📦 *Acertijo 9:*
Está en el centro de gravedad, pero no tiene masa. ¿Qué es?`, respuesta: `La letra 'v'` },
  { pregunta: `🔥 *Acertijo 10:*
Tengo un solo ojo, pero no puedo ver. ¿Qué soy?`, respuesta: `Una aguja` },
  { pregunta: `⏳ *Acertijo 11:*
Tiene manos, pero no puede aplaudir. ¿Qué es?`, respuesta: `Un reloj` },
  { pregunta: `🌧️ *Acertijo 12:*
Entre más seco, más moja. ¿Qué es?`, respuesta: `Una toalla` },
  { pregunta: `🪞 *Acertijo 13:*
Refleja pero no habla. ¿Qué es?`, respuesta: `Un espejo` },
  { pregunta: `🧠 *Acertijo 14:*
Mientras más se comparte, más crece. ¿Qué es?`, respuesta: `El conocimiento` },
  { pregunta: `🚪 *Acertijo 15:*
Tiene cerradura pero no puerta. ¿Qué es?`, respuesta: `Un archivo encriptado` },
  { pregunta: `🔐 *Acertijo 16:*
Tiene claves pero no cerraduras. ¿Qué es?`, respuesta: `Un teclado` },
  { pregunta: `🧱 *Acertijo 17:*
¿Qué se moja mientras seca?`, respuesta: `Una toalla` },
  { pregunta: `🪵 *Acertijo 18:*
Entre más te llevas, más dejas atrás. ¿Qué es?`, respuesta: `Huellas` },
  { pregunta: `💭 *Acertijo 19:*
No se puede ver, ni tocar, pero llena una habitación. ¿Qué es?`, respuesta: `El silencio` },
  { pregunta: `📏 *Acertijo 20:*
Tiene pies pero no camina. ¿Qué es?`, respuesta: `Una regla` },
];

module.exports = {
  name: "acertijo",
  category: "diversion",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    return await ctx.reply(`${acertijo.pregunta}\n\n||Respuesta: *${acertijo.respuesta}*||`);
  }
};
