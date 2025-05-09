const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "gemini",
    category: "ai-chat",
    permissions: {
        coin: 10
    },
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
            if (checkMedia || checkQuotedMedia) {
                const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
                const uploadUrl = await tools.general.upload(buffer, "image");
                const apiUrl = tools.api.createUrl("otinxsandip", "/gemini2", {
                    prompt: input,
                    url: uploadUrl
                });
                const result = (await axios.get(apiUrl)).data.answer;

                return await ctx.reply(result);
            } else {
                const apiUrl = tools.api.createUrl("otinxsandip", "/gemini", {
                    prompt: input
                });
                const result = (await axios.get(apiUrl)).data.answer;

                return await ctx.reply(result);
            }
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};