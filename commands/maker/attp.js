const {
    quote
} = require("@mengkodingan/ckptw");
const {
    Sticker,
    StickerTypes
} = require("wa-sticker-formatter");

module.exports = {
    name: "attp",
    category: "maker",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "get in the fucking robot, shinji!"))}\n` +
            quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el texto sea la entrada de destino, si el texto requiere una nueva línea."]))
        );

        if (input.length > 10000) return await ctx.reply(quote("❎ ¡Máximo 10000 palabras!"));

        try {
            const apiUrl = tools.api.createUrl("bk9", "/maker/text2gif", {
                q: input
            });
            const result = new Sticker(apiUrl, {
                pack: config.sticker.packname,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: ["🌕"],
                id: ctx.id,
                quality: 50
            });

            return await ctx.reply(await result.toMessage());
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};