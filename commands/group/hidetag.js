const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "n",
    aliases: ["n"],
    category: "group",
    permissions: {
        admin: true,
        group: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;;

        try {
            const members = await ctx.group().members();
            const mentions = members.map(m => m.id);

            return await ctx.reply({
                text: input,
                mentions
            });
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};
