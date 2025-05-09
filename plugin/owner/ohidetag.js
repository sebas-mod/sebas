const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "ohidetag",
    aliases: ["oht"],
    category: "owner",
    permissions: {
        group: true,
        owner: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || quote("👋 Hola mundo!");

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