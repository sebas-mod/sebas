const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "omute",
    category: "owner",
    permissions: {
        group: true,
        owner: true
    },
    code: async (ctx) => {
        const accountJid = ctx.quoted.senderJid || ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || null;
        const accountId = tools.general.getID(accountJid);
        const senderJid = ctx.sender.jid;
        const senderId = tools.general.getID(senderJid);
        const groupId = ctx.isGroup() ? tools.general.getID(ctx.id) : null;

        if (ctx.args[0] === "bot") {
            await db.set(`group.${groupId}.mutebot`, true);
            return await ctx.reply(quote("✅ ¡Este grupo se ha silenciado con éxito de los bots!"));
        }

        if (!accountJid) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId}`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino.", `Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} bot`)} para silenciar el bot.`])),
            mentions: [senderJid]
        });

        if (accountId === config.bot.id) return await ctx.reply(quote(`❎ Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} bot`)} para silenciar el bot.`));

        if (await ctx.group().isAdmin(accountJid)) return await ctx.reply(quote("❎ ¡Él es el administrador del grupo!"));

        try {
            const muteList = await db.get(`group.${groupId}.mute`) || [];

            if (!muteList.includes(accountId)) muteList.push(accountId);

            await db.set(`group.${groupId}.mute`, muteList);

            return await ctx.reply(quote("✅ ¡Usuarios de este grupo silenciados exitosamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};