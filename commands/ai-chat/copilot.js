const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "copilot",
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
            const senderUid = await db.get(`user.${tools.general.getID(ctx.sender.jid)}.uid`) || "guest";
            const apiUrl = tools.api.createUrl("fasturl", "/aillm/copilot", {
                ask: input,
                style: `Eres una bot de WhatsApp llamado ${config.bot.name}, creada por ${config.owner.name}. Sea amable, informativa y atractiva. Nunca mencione a nadie más que... ${ctx.sender.pushName}.`, // Dapat diubah sesuai keinginan Anda
                sessionId: senderUid
            });
            const result = (await axios.get(apiUrl)).data.result;
            const imageUrl = result.images[0]?.url;
            const resultText = result.text;

            if (imageUrl) {
                return await ctx.reply({
                    image: {
                        url: imageUrl
                    },
                    mimetype: mime.lookup("jpg"),
                    caption: resultText
                });
            } else {
                return await ctx.reply(resultText);
            }
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};