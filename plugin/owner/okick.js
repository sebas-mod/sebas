const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "okick",
    category: "owner",
    permissions: {
        botAdmin: true,
        group: true,
        owner: true,
        restrict: true
    },
    code: async (ctx) => {
        const senderJid = ctx.sender.jid;
        const senderId = tools.general.getID(senderJid);
        const accountJid = ctx.quoted.senderJid || ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || null;

        if (!accountJid) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId}`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino."])),
            mentions: [senderJid]
        });

        if (await ctx.group().isAdmin(accountJid)) return await ctx.reply(quote("❎ ¡Él es el administrador del grupo!"));

        try {
            await ctx.group().kick([accountJid]);

            return await ctx.reply(quote("✅ ¡Emitido exitosamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};