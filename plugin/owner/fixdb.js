const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "fixdb",
    aliases: ["fixdatabase"],
    category: "owner",
    permissions: {
        owner: true
    },
    code: async (ctx) => {
        const input = ctx.args[0] || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "user"))
        );

        if (input === "list") {
            const listText = await tools.list.get("fixdb");
            return await ctx.reply(listText);
        }

        try {
            const waitMsg = await ctx.reply(config.msg.wait);
            const dbJSON = await db.toJSON();
            const data = {
                user: dbJSON.user || {},
                group: dbJSON.group || {},
                menfess: dbJSON.menfess || {}
            };

            const filteredData = (category, item) => {
                const mappings = {
                    user: {
                        afk: {
                            reason: "string",
                            timestamp: "number"
                        },
                        banned: "boolean",
                        coin: "number",
                        lastClaim: {
                            daily: "number",
                            weekly: "number",
                            monthly: "number",
                            yearly: "number"
                        },
                        hasSentMsg: {
                            banned: "boolean",
                            cooldown: "boolean",
                            admin: "boolean",
                            botAdmin: "boolean",
                            coin: "boolean",
                            group: "boolean",
                            owner: "boolean",
                            premium: "boolean",
                            private: "boolean",
                            restrict: "boolean"
                        },
                        level: "number",
                        premium: "boolean",
                        uid: "string",
                        username: "string",
                        winGame: "number",
                        xp: "number"
                    },
                    group: {
                        mute: "object",
                        text: {
                            goodbye: "string",
                            intro: "string",
                            welcome: "string"
                        },
                        option: {
                            antiaudio: "boolean",
                            antidocument: "boolean",
                            antigif: "boolean",
                            antiimage: "boolean",
                            antilink: "boolean",
                            antinfsw: "boolean",
                            antisticker: "boolean",
                            antitoxic: "boolean",
                            antivideo: "boolean",
                            autokick: "boolean",
                            gamerestrict: "boolean",
                            welcome: "boolean"
                        },
                        spam: "object"
                    },
                    menfess: {
                        from: "string",
                        to: "string"
                    }
                };

                const validate = (obj, map) => {
                    if (typeof map === "string") {
                        return typeof obj === map;
                    } else if (typeof map === "object") {
                        if (typeof obj !== "object" || obj === null) return false;
                        const result = {};
                        for (const key in map) {
                            if (validate(obj[key], map[key])) {
                                result[key] = obj[key];
                            }
                        }
                        return result;
                    }
                    return false;
                };

                const schema = mappings[category];
                const result = validate(item, schema);
                return result || {};
            };

            const processData = async (category, data) => {
                await ctx.editMessage(waitMsg.key, quote(`🔄 Procesamiento de datos ${category}...`));
                for (const id of Object.keys(data)) {
                    const item = data[id] || {};
                    const filtered = filteredData(category, item);

                    if (!/^\d+$/.test(id) || Object.keys(filtered).length === 0) {
                        await db.delete(`${category}.${id}`);
                    } else {
                        await db.set(`${category}.${id}`, filtered);
                    }
                }
            };

            switch (input) {
                case "user":
                case "group":
                case "menfess":
                    await processData(input, data[input]);
                    break;

                default:
                    return await ctx.reply(quote(`❎ La clave "${input}" no es válida!`));
            }

            return await ctx.editMessage(waitMsg.key, quote(`✅ La base de datos se limpió correctamente para ${input}!`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};