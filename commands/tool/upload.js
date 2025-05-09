const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "upload",
    aliases: ["tourl"],
    category: "tool",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        const msgType = ctx.getMessageType();
        const [checkMedia, checkQuotedMedia] = await Promise.all([
            tools.cmd.checkMedia(msgType, ["audio", "document", "image", "video", "sticker"]),
            tools.cmd.checkQuotedMedia(ctx.quoted, ["audio", "document", "image", "video", "sticker"])
        ]);

        if (!checkMedia && !checkQuotedMedia) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send", "reply"], ["audio", "document", "image", "video", "sticker"]))}\n` +
            quote(tools.cmd.generatesFlagInformation({
                "-t <text>": "Atur tipe media (tersedia: any, image, video, audio | default: any)",
                "-h <text>": `Atur host uploader (tersedia: catbox, cloudku, erhabot, fasturl, idnet, litterbox, nyxs, pomf, quax, quax, ryzen, shojib, tmperhabot, uguu, videy | default: ${config.system.uploaderHost.toLowerCase()})`
            }))
        );

        try {
            const flag = tools.cmd.parseFlag(input, {
                "-t": {
                    type: "value",
                    key: "type",
                    validator: (val) => /^(any|image|video|audio)$/.test(val),
                    parser: (val) => val
                },
                "-h": {
                    type: "value",
                    key: "host",
                    validator: (val) => /^(catbox|cloudku|erhabot|fasturl|idnet|litterbox|nyxs|pomf|quax|quax|ryzen|shojib|tmperhabot|uguu|videy)$/.test(val),
                    parser: (val) => val
                }
            });

            const type = flag.type || "any";
            const host = flag.host || config.system.uploaderHost.toLowerCase();

            const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            const result = await tools.general.upload(buffer, type, host);

            return await ctx.reply(
                `${quote(`URL: ${result}`)}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};