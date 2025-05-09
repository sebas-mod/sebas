const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "githubpraising",
    aliases: ["ghpraising"],
    category: "ai-misc",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "KenisawaDev"))
        );

        try {
            const apiUrl = tools.api.createUrl("fasturl", "/aiexperience/github/praising", {
                username: input,
                profile: false,
                language: ctx.sender.jid.startsWith("5") ? "es" : "en"
            });
            const result = (await axios.get(apiUrl)).data.result.praising;

            return await ctx.reply(result);
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};
//////