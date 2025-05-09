const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "transfer",
    aliases: ["tf"],
    category: "profile",
    permissions: {},
    code: async (ctx) => {
        const mentionedJid = ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const userId = ctx.args[0];
        const userJid = ctx.quoted.senderJid || mentionedJid || (userId ? `${userId}@s.whatsapp.net` : null);
        const senderId = tools.general.getID(ctx.sender.jid);
        const coinAmount = parseInt(ctx.args[mentionedJid ? 1 : 0], 10);

        if ((!userJid || !coinAmount) || isNaN(coinAmount)) return await ctx.reply({
            text: `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
                `${quote(tools.cmd.generateCommandExample(ctx.used, `@${senderId} 8`))}\n` +
                quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el remitente sea la cuenta de destino."])),
            mentions: [senderJid]
        });

        const [isOnWhatsApp] = await ctx.core.onWhatsApp(userJid);
        if (!isOnWhatsApp.exists) return await ctx.reply(quote("❎ ¡La cuenta no existe en WhatsApp!"));

        const userDb = await db.get(`user.${senderId}`) || {};

        if (tools.general.isOwner(senderId, ctx.msg.key.id) || userDb?.premium) return await ctx.reply(quote("❎ No se pueden transferir eris ilimitadas."));

        if (userDb?.coin < coinAmount) return await ctx.reply(quote("❎ ¡Tus eris no son suficientes para esta transferencia!"));

        try {
            await db.add(`user.${tools.general.getID(userJid)}.coin`, coinAmount);
            await db.subtract(`user.${senderId}.coin`, coinAmount);

            return await ctx.reply(quote(`✅ ¡Se transfirieron exitosamente ${coinAmount} eris al usuario!`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};