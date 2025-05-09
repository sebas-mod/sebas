const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "banuser",
    aliases: ["ban", "bu"],
    category: "owner",
    permissions: {
        owner: true
    },
    code: async (ctx) => {
        const userId = ctx.args[0];
        const userJid = ctx.quoted.senderJid || ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (userId ? `${userId}@s.whatsapp.net` : null);
        const senderJid = ctx.sender.jid;
        const senderId = tools.general.getID(senderJid);

        if (!userJid) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId}`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino."])),
            mentions: [senderJid]
        });

        const [isOnWhatsApp] = await ctx.core.onWhatsApp(userJid);
        if (!isOnWhatsApp.exists) return await ctx.reply(quote("❎ ¡La cuenta no existe en WhatsApp!"));

        try {
            await db.set(`user.${tools.general.getID(userJid)}.banned`, true);

            await ctx.sendMessage(userJid, {
                text: quote("🎉 ¡El propietario te ha baneado!")
            });
            return await ctx.reply(quote("✅ ¡Bloqueado exitosamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};