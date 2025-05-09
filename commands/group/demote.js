const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "demote",
    category: "group",
    permissions: {
        admin: true,
        botAdmin: true,
        group: true
    },
    code: async (ctx) => {
        const accountJid = ctx.quoted.senderJid || ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || null;
        const senderJid = ctx.sender.jid;
        const senderId = tools.general.getID(senderJid);

        if (!accountJid) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId}`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino."])),
            mentions: [senderJid]
        });

        if (!await ctx.group().isAdmin(accountJid)) return await ctx.reply(quote("❎ ¡Él es un miembro!"));

        try {
            await ctx.group().demote([accountJid]);

            return await ctx.reply(quote("✅ ¡Degradado exitosamente de administrador a miembro!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};