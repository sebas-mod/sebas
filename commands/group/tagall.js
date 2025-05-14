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
  desc: "Menciona a todos los participantes del grupo con imagen",
  code: async (ctx) => {
    try {
      const input = ctx.args.join(" ") || ctx.quoted?.conversation || Object.values(ctx.quoted || {}).map(v => v?.text || v?.caption).find(Boolean) || "¡Activarse gente!";
      const group = await ctx.group();
      const members = await group.members(); // <- CORREGIDO

      const mentions = members.map(m => {
        const serialized = tools.general.getID(m.id);
        return {
          tag: `🔥 @${serialized}`,
          mention: m.id
        };
      });

      const tags = mentions.map(m => m.tag).join("\n");
      const caption = `👥 Total: ${members.length} participantes.\n${input}\n─────\n${tags}\n\nby sebas - MD`;

      const imageUrl = 'https://i.imgur.com/2Z8bdeN.jpg';

      return await ctx.reply({
        image: { url: imageUrl },
        caption,
        mentions: mentions.map(m => m.mention)
      });

    } catch (err) {
      return await tools.cmd.handleError(ctx, err, false);
    }
  }
};
