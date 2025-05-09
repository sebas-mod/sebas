const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "githubsearch",
    aliases: ["gh", "ghs", "github", "githubs"],
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
            const apiUrl = tools.api.createUrl("agatz", "/api/github", {
                message: input
            });
            const result = (await axios.get(apiUrl)).data.data;

            const resultText = result.map((r) =>
                `${quote(`Nomnre: ${r.fullName}`)}\n` +
                `${quote(`Descripcion: ${r.description}`)}\n` +
                `${quote(`Vistas: ${r.watchers}`)}\n` +
                `${quote(`Número de astrónomos: ${r.stargazersCount}`)}\n` +
                `${quote(`Cuestiones abiertas: ${r.openIssues}`)}\n` +
                `${quote(`Forks: ${r.forks}`)}\n` +
                `${quote(`Link: ${r.htmlUrl}`)}`
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