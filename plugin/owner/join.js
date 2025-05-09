const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "join",
    aliases: ["j"],
    category: "owner",
    permissions: {
        owner: true
    },
    code: async (ctx) => {
        const url = ctx.args[0] || null;

        if (!url) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "https://example.com/"))
        );

        const isUrl = await tools.general.isUrl(url);
        if (!isUrl) return await ctx.reply(config.msg.urlInvalid);

        try {
            const urlCode = new URL(url).pathname.split("/").pop();
            await ctx.groups.acceptInvite(urlCode).then(async result => {
                await ctx.sendMessage(result, {
                    text: quote(`👋 ¡Hola! Soy un bot de WhatsApp llamado ${config.bot.name}, propiedad de ${config.owner.name}. Puedo realizar muchos comandos, como hacer stickers, usar IA para determinados trabajos, etc.!`)
                });
            });

            return await ctx.reply(quote("✅ ¡Se ha unido al grupo con éxito!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};