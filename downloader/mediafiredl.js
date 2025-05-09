const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "mediafiredl",
    aliases: ["mediafire", "mf", "mfdl"],
    category: "downloader",
    permissions: {
        premium: true
    },
    code: async (ctx) => {
        const url = ctx.args[0] || null;

        if (!url) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "https://example.com/"))
        );

        const isUrl = await tools.general.isUrl(url);
        if (!isUrl) return await ctx.reply(config.msg.urlInvalid);

        try {
            const apiUrl = tools.api.createUrl("agatz", "/api/mediafire", {
                url
            });
            const result = (await axios.get(apiUrl)).data.data[0];

            return await ctx.reply({
                document: {
                    url: result.link
                },
                caption: `${quote(`Link: ${url}`)}\n` +
                    "\n" +
                    config.msg.footer,
                fileName: data.nama,
                mimetype: mime.lookup(data.mime) || "application/octet-stream"
            });
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};