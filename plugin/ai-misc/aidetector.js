const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "aidetector",
    category: "ai-misc",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "ingresa un texto!"))
        );

        try {
            const apiUrl = tools.api.createUrl("bk9", "/tools/txtdetect", {
                q: input
            });
            const result = (await axios.get(apiUrl)).data.BK9.data;

            return await ctx.reply(
                `${quote(`Es IA?: ${result.isHuman === 0 ? "si" : "no"}`)}\n` +
                `${quote(`Porcentaje de IA: ${result.fakePercentage}%`)}\n` +
                `${quote(`Humano: ${result.textWords}, ${result.aiWords} de IA`)}\n` +
                `${quote(`Idioma: ${result.detected_language}`)}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};