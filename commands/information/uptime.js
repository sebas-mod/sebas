const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "uptime",
    aliases: ["runtime"],
    category: "information",
    permissions: {},
    code: async (ctx) => {
        const uptime = tools.general.convertMsToDuration(Date.now() - config.bot.readyAt);
        return await ctx.reply(quote(`🚀 La bot ha estado activa durante ${uptime}.`));
    }
};