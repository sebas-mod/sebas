const {
  quote
} = require("@mengkodingan/ckptw");

module.exports = {
  name: "tagall",
  category: "group",
  permissions: {
    admin: true,
    group: true
  },
  desc: "Menciona a todos los participantes del grupo",
  code: async (ctx) => {
    try {
      const input = ctx.args.join(" ") || ctx.quoted?.conversation || Object.values(ctx.quoted || {}).map(v => v?.text || v?.caption).find(Boolean);
      const group = await ctx.group();
      const members = await group.members();

      const mentions = members.map(m => {
        const serialized = tools.general.getID(m.id);
        return {
          tag: `🔥 @${serialized}`,
          mention: m.id
        };
      });

      const tags = mentions.map(m => m.tag).join("\n");
      const message =
        `👥 Total: ${members.length} participantes.\n` +
        (input ? `🗣 Mensaje: ${input}\n` : '') +
        `─────\n${tags}\n\nby sebas - MD`;

      return await ctx.reply({
        text: message,
        mentions: mentions.map(m => m.mention)
      });

    } catch (err) {
      return await tools.cmd.handleError(ctx, err, false);
    }
  }
};
