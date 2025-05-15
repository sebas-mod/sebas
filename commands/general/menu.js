const {
    bold,
    italic,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");
const moment = require("moment-timezone");

module.exports = {
    name: "menu",
    aliases: ["allmenu", "help", "list", "listmenu"],
    category: "general",
    permissions: {},
    code: async (ctx) => {
        try {
            const {
                cmd
            } = ctx.bot;
            const tag = {
                "ai-chat": "AI (Chat)",
                "ai-image": "AI (Image)",
                "ai-misc": "AI (Miscellaneous)",
                "converter": "Converter",
                "downloader": "Downloader",
                "entertainment": "Entertainment",
                "group": "Group",
                "maker": "Maker",
                "profile": "Profile",
                "search": "Search",
                "tool": "Tool",
                "owner": "Owner",
                "information": "Information",
                "misc": "Miscellaneous",
                "games": "games"
            };

let text = `Hola @${tools.general.getID(ctx.sender.jid)}!, Aquí esta la lista de comandos disponibles!\n` +
    `${quote(`Total de comandos: ${ctx.bot.cmd.size}`)}\n` +
    "\n" +
              `${quote(`Fecha: ${moment.tz(config.system.timeZone).locale("es").format("dddd, DD MMMM YYYY")}`)}\n` +
                `${quote(`Hora: ${moment.tz(config.system.timeZone).format("HH.mm.ss")}`)}\n` +
                "\n" +
`${quote(`Bot Activo: ${tools.general.convertMsToDuration(Date.now() - config.bot.readyAt)}`)}\n` +
    `${quote(`Base De Datos: ${config.bot.dbSize} (Simpl.DB - JSON)`)}\n` +
                `${quote("Librería: @mengkodingan/ckptw")}\n` +
                "\n" +
                `${italic("creador: sebas-MD wa.me/5466887146!")}\n` +
                `${config.msg.readmore}\n`;

            for (const category of Object.keys(tag)) {
                const categoryCommands = Array.from(cmd.values())
                    .filter(command => command.category === category)
                    .map(command => ({
                        name: command.name,
                        aliases: command.aliases,
                        permissions: command.permissions || {}
                    }));

                if (categoryCommands.length > 0) {
                    text += `◆ ${bold(tag[category])}\n`;

                    categoryCommands.forEach(cmd => {
                        let permissionsText = "";
                        if (cmd.permissions.coin) permissionsText += "ⓒ";
                        if (cmd.permissions.group) permissionsText += "Ⓖ";
                        if (cmd.permissions.owner) permissionsText += "Ⓞ";
                        if (cmd.permissions.premium) permissionsText += "Ⓟ";
                        if (cmd.permissions.private) permissionsText += "ⓟ";

                        text += quote(monospace(`${ctx.used.prefix + cmd.name} ${permissionsText}`));
                        text += "\n";
                    });

                    text += "\n";
                }
            }

            text += config.msg.footer;


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
                return await ctx.sendMessage(ctx.id, {
                    video: {
                        url
                    },
                    mimetype: mime.lookup("mp4"),
                    caption: text,
                    gifPlayback: true,
                    contextInfo: {
                        mentionedJid: [ctx.sender.jid],
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
                if (error.status !== 200) return await ctx.sendMessage(ctx.id, {
                    text,
                    contextInfo: {
                        mentionedJid: [ctx.sender.jid],
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
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};