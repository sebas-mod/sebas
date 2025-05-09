const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "hellosehatsearch",
    aliases: ["hellosehat", "hellosehats"],
    category: "search",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "anhedonia"))
        );

        try {
            const apiUrl = tools.api.createUrl("archive", "/api/search/hallosehat", {
                query: input
            });
            const result = (await axios.get(apiUrl)).data.result;

            const resultText = result.map((r) =>
                `${quote(`Titulo: ${r.title}`)}\n` +
                `${quote(`Descripcion: ${r.desc}`)}\n` +
                `${quote(`Link: ${r.link}`)}`
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