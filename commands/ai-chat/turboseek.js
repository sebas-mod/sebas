const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "turboseek",
    category: "ai-chat",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "¿Qué es un bot de WhatsApp?"))}\n` +
            quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el texto sea la entrada de destino, si el texto requiere una nueva línea."]))
        );

        try {
            const apiUrl = tools.api.createUrl("fasturl", "/aiexperience/turboseek", {
                ask: input
            });
            const result = (await axios.get(apiUrl)).data.result.answer;

            return await ctx.reply(result);
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};