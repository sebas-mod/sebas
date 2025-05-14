const juegos = {};

const palabras = [
  "javascript", "programador", "computadora", "teclado", "pantalla", "ahorcado", "variable", "funcion",
  "constante", "internet", "conexion", "mensaje", "grupo", "comando", "bot", "nodejs", "terminal", "desarrollador",
  "codigo", "sintaxis", "framework", "asistente", "respuesta", "evento", "estructura", "servidor", "cliente",
  "proyecto", "modulo", "archivo", "paquete", "carpeta", "nombre", "proceso", "sesion", "funcionalidad",
  "lenguaje", "memoria", "condicion", "bucle"
];

module.exports = {
  name: "ahorcado",
  category: "games",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const groupId = ctx.chat;

    if (global.juegos?.[groupId]) {
      return await ctx.reply("⚠️ Ya hay un juego de ahorcado en curso en este grupo.");
    }

    const palabra = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    const progreso = palabra.split("").map(c => (c === " " ? " " : "_"));
    global.juegos = global.juegos || {};
    global.juegos[groupId] = {
      palabra,
      letras: [],
      progreso,
      intentos: 10
    };

    return await ctx.reply(
      `🎮 Ahorcado iniciado!
Adivina la palabra con .letra <letra>

` +
      `Palabra: ${progreso.join(" ")}
Intentos disponibles: 10`
    );
  }
};