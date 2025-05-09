const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "oadd",
    category: "owner",
    permissions: {
        botAdmin: true,
        group: true,
        owner: true,
        restrict: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input || isNaN(input)) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, tools.general.getID(ctx.sender.jid)))
        );

        const accountJid = `${input.replace(/[^\d]/g, "")}@s.whatsapp.net`;

        const [isOnWhatsApp] = await ctx.core.onWhatsApp(accountJid);
        if (!isOnWhatsApp.exists) return await ctx.reply(quote("❎ ¡La cuenta no existe en WhatsApp!"));

        try {
            await ctx.group().add([accountJid]);

            return await ctx.reply(quote("✅ ¡Añadido exitosamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};