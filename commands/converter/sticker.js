const { Sticker, StickerTypes } = require("wa-sticker-formatter");

module.exports = {
  name: "sticker",
  aliases: ["s", "stiker"],
  category: "converter",
  permissions: {},
  code: async (ctx) => {
    const msgType = ctx.getMessageType();
    const isImage = msgType === "image" || ctx.quoted?.mimetype?.includes("image");
    const isVideo = msgType === "video" || ctx.quoted?.mimetype?.includes("video");

    if (!isImage && !isVideo) {
      return await ctx.reply("❌ Debes enviar o responder a una *imagen* o *video corto* (menos de 6 segundos).");
    }

    try {
      const media = ctx.msg?.media || ctx.quoted?.media;
      const buffer = await media.toBuffer();

      const sticker = new Sticker(buffer, {
        pack: "Baylis Pack",
        author: "Tu Bot",
        type: StickerTypes.FULL,
        quality: 70,
        id: ctx.id
      });

      await ctx.reply(await sticker.toMessage());
    } catch (error) {
      console.error("❌ Error creando sticker:", error);
      return await ctx.reply("❌ Ocurrió un error al crear el sticker. Asegúrate de enviar un archivo válido.");
    }
  }
};
