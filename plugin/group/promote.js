const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "promote",
    category: "group",
    permissions: {
        admin: true,
        botAdmin: true,
        group: true
    },
    code: async (ctx) => {
        const accountJid = ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || ctx.quoted.senderJid || null;
        const senderJid = ctx.sender.jid;
        const senderId = tools.general.getID(senderJid);

        if (!accountJid) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId}`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino."])),
            mentions: [senderJid]
        });

        if (await ctx.group().isAdmin(accountJid)) return await ctx.reply(quote("❎ ¡Él es el administrador del grupo!"));

        try {
            await ctx.group().promote([accountJid]);

            return await ctx.reply(quote("✅ ¡Actualizado exitosamente de miembro a administrador!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};