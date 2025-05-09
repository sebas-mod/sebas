const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "broadcastgc",
    aliases: ["bc", "bcgc"],
    category: "owner",
    permissions: {
        owner: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "halo, dunia!"))}\n` +
            quote(tools.cmd.generateNotes(["Responda o cite el mensaje para que el texto sea la entrada de destino, si el texto requiere una nueva línea."]))
        );

        try {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const groupData = await ctx.core.groupFetchAllParticipating();
            const groupIds = Object.values(groupData).map(g => g.id);

            const waitMsg = await ctx.reply(quote(`🔄 Envío de transmisiones a ${groupIds.length} grupos, Tiempo estimado: ${(groupIds.length * 0.5 / 60).toFixed(2)} minutos.`));

            const failedGroupIds = [];

            for (const groupId of groupIds) {
                await delay(500);
                try {
                    const fakeQuotedText = {
                        key: {
                            participant: "13135550002@s.whatsapp.net",
                            remoteJid: "status@broadcast"
                        },
                        message: {
                            extendedTextMessage: {
                                text: config.msg.note
                            }
                        }
                    };

                    try {
                        const url = (await axios.get(tools.api.createUrl("http://vid2aud.hofeda4501.serv00.net", "/api/img2vid", {
                            url: config.bot.thumbnail
                        }))).data.result;
                        await ctx.sendMessage(groupId, {
                            video: {
                                url
                            },
                            mimetype: mime.lookup("mp4"),
                            caption: input,
                            gifPlayback: true,
                            contextInfo: {
                                forwardingScore: 9999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: config.bot.newsletterJid,
                                    newsletterName: config.bot.name
                                }
                            },
                        }, {
                            quoted: fakeQuotedText
                        });
                    } catch (error) {
                        if (error.status !== 200)
                            await ctx.sendMessage(groupId, {
                                text: input,
                                contextInfo: {
                                    forwardingScore: 9999,
                                    isForwarded: true,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterJid: config.bot.newsletterJid,
                                        newsletterName: config.bot.name
                                    }
                                },
                            }, {
                                quoted: fakeQuotedText
                            });
                    }
                } catch (error) {
                    failedGroupIds.push(groupId);
                }
            }

            const successCount = groupIds.length - failedGroupIds.length;
            return await ctx.editMessage(waitMsg.key, quote(`✅ Enviado exitosamente al grupo ${successCount}. No se pudo enviar al grupo ${failedGroupIds.length}.`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};