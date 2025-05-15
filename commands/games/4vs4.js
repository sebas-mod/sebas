
const partidas = new Map();

module.exports = {
  name: "4vs4",
  tags: ["games"],
  group: true,
  code: async (ctx) => {
    const args = ctx.args;
    if (args.length < 4) return ctx.reply("Usa: .4vs4 <región> <hora> <bandera> <modalidad>");

    const [region, hora, bandera, modalidad] = args;
    const partidaId = `${ctx.id}-${Date.now()}`;
    const partida = {
      jugadores: [],
      suplentes: [],
      id: partidaId,
      creador: ctx.sender.jid,
      info: { region, hora, bandera, modalidad },
    };

    partidas.set(partidaId, partida);

    const mensaje = await ctx.sendMessage(ctx.id, {
      text: generarMensaje(partida),
      react: { text: "🙋‍♂️" },
    });

    partida.msgKey = mensaje.key;
    partida.chatId = ctx.id;
  },
};

function generarMensaje(partida) {
  return `*PARTIDA 4vs4 ${partida.info.modalidad.toUpperCase()}*\n` +
    `Región: ${partida.info.region}\nHora: ${partida.info.hora} ${partida.info.bandera}\n\n` +
    `*JUGADORES*\n${partida.jugadores.map(p => `🥷 ${p}`).join("\n") || "Vacío"}\n\n` +
    `*SUPLENTES*\n${partida.suplentes.map(s => `🫡 ${s}`).join("\n") || "Vacío"}`;
}

global.partidas = partidas;
