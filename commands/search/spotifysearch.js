const {
    bold,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "spotifysearch",
    aliases: ["spotify", "spotifys"],
    category: "search",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "evangelion"))
        );

        try {
            const apiUrl = tools.api.createUrl("agatz", "/api/spotify", {
                message: input
            });
            const result = (await axios.get(apiUrl)).data.data;

            const resultText = result.map((r) =>
                `${quote(`Titulo: ${r.trackName}`)}\n` +
                `${quote(`Artista: ${r.artistName}`)}\n` +
                `${quote(`Link: ${r.externalUrl}`)}`
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