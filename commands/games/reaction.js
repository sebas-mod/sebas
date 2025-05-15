
module.exports = {
  name: "reaction",
  fromMe: false,
  code: async (ctx) => {
    const reaction = ctx.message.reaction.emoji;
    const msgKey = ctx.message.key;
    const jid = ctx.sender.jid;

    for (const [id, partida] of global.partidas) {
      if (
        partida.chatId === ctx.id &&
        partida.msgKey.id === msgKey.id &&
        partida.msgKey.remoteJid === msgKey.remoteJid
      ) {
        const nombre = tools.general.getName(ctx.sender.jid);

        if (reaction === "🙋‍♂️") {
          if (partida.jugadores.length < 4 && !partida.jugadores.includes(nombre)) {
            partida.jugadores.push(nombre);
          }
        } else if (reaction === "🫡") {
          if (partida.suplentes.length < 2 && !partida.suplentes.includes(nombre)) {
            partida.suplentes.push(nombre);
          }
        }

        await ctx.bot.sendMessage(partida.chatId, {
          text: `*PARTIDA 4vs4 ${partida.info.modalidad.toUpperCase()}*\n` +
                `Región: ${partida.info.region}\nHora: ${partida.info.hora} ${partida.info.bandera}\n\n` +
                `*JUGADORES*\n${partida.jugadores.map(p => `🥷 ${p}`).join("\n") || "Vacío"}\n\n` +
                `*SUPLENTES*\n${partida.suplentes.map(s => `🫡 ${s}`).join("\n") || "Vacío"}`
        });
        break;
      }
    }
  },
};
