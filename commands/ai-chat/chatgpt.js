const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "chatgpt",
    aliases: ["ai", "cgpt", "chatai", "gpt", "openai"],
    category: "ai-chat",
    permissions: {},
    code: async (ctx) => {
        const input = ctx.args.join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], [ "image","text"]))}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "¿Qué es un bot de WhatsApp?"))}\n` +
            quote(tools.cmd.generateNotes(["Esta IA puede mirar imágenes y responder preguntas sobre ellas.", "Responder o citar un mensaje para que el texto sea la entrada de destino, si el texto requiere una nueva línea."]))
        );

        const msgType = ctx.getMessageType();
        const [checkMedia, checkQuotedMedia] = await Promise.all([
            tools.cmd.checkMedia(msgType, "image"),
            tools.cmd.checkQuotedMedia(ctx.quoted, "image")
        ]);

        try {
            const style = `Eres una bot de WhatsApp llamado ${config.bot.name}, creada por ${config.owner.name}. Sea amigable, informativa y atractiva.`; // Dapat diubah sesuai keinginan Anda
            const senderUid = await db.get(`user.${tools.general.getID(ctx.sender.jid)}.uid`) || "guest";

            if (checkMedia || checkQuotedMedia) {
                const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
                const uploadUrl = await tools.general.upload(buffer, "image");
                const apiUrl = tools.api.createUrl("fasturl", "/aillm/gpt-4o", {
                    ask: input,
                    style,
                    imageUrl: uploadUrl,
                    sessionId: senderUid
                });
                const result = (await axios.get(apiUrl)).data.result;

                return await ctx.reply(result);
            } else {
                const apiUrl = tools.api.createUrl("fasturl", "/aillm/gpt-4o", {
                    ask: input,
                    style,
                    sessionId: senderUid
                });
                const result = (await axios.get(apiUrl)).data.result;

                return await ctx.reply(result);
            }
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};