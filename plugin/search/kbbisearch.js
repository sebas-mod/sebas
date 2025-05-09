const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "kbbisearch",
    aliases: ["kbbi", "kbbis"],
    category: "search",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "bogor"))
        );

        try {
            const apiUrl = tools.api.createUrl("fasturl", "/search/kbbi", {
                word: input
            });
            const result = (await axios.get(apiUrl)).data.result.definitions;

            const resultText = result.map((r) =>
                `${quote(`Term: ${r.term}`)}\n` +
                `${quote(`Pronunciacion: ${r.pronunciation}`)}\n` +
                `${quote(`Clase: ${r.class}`)}\n` +
                `${quote(`Meaning: ${r.meaning}`)}\n`
            ).join(
                "\n" +
                `${quote("─────")}\n`
            );
            return await ctx.reply(
                `${resultText}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};