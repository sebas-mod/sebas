const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "setoption",
    aliases: ["setopt"],
    category: "group",
    permissions: {
        admin: true,
        botAdmin: true,
        group: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(`${tools.cmd.generateInstruction(["send"], ["text"])}`)}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "antilink"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`, `Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} status`)} para ver el estado.`]))
        );

        if (input === "list") {
            const listText = await tools.list.get("setoption");
            return await ctx.reply(listText);
        }

        if (input === "status") {
            const groupId = ctx.isGroup() ? tools.general.getID(ctx.id) : null;
            const groupOption = await db.get(`group.${groupId}.option`) || {};

            return await ctx.reply(
                `${quote(`Antiaudio: ${groupOption.antiaudio ? "On" : "Off"}`)}\n` +
                `${quote(`Antidocument: ${groupOption.antidocument ? "On" : "Off"}`)}\n` +
                `${quote(`Antigif: ${groupOption.antigif ? "On" : "Off"}`)}\n` +
                `${quote(`Antiimage: ${groupOption.antiimage ? "On" : "Off"}`)}\n` +
                `${quote(`Antilink: ${groupOption.antilink ? "On" : "Off"}`)}\n` +
                `${quote(`Antinsfw: ${groupOption.antinsfw ? "On" : "Off"}`)}\n` +
                `${quote(`Antispam: ${groupOption.antispam ? "On" : "Off"}`)}\n` +
                `${quote(`Antisticker: ${groupOption.antisticker ? "On" : "Off"}`)}\n` +
                `${quote(`Antitoxic: ${groupOption.antitoxic ? "On" : "Off"}`)}\n` +
                `${quote(`Antivideo: ${groupOption.antivideo ? "On" : "Off"}`)}\n` +
                `${quote(`Autokick: ${groupOption.autokick ? "Om" : "Off"}`)}\n` +
                `${quote(`Gamerestrict: ${groupOption.gamerestrict ? "On" : "Off"}`)}\n` +
                `${quote(`Welcome: ${groupOption.welcome ? "On" : "Off"}`)}\n` +
                "\n" +
                config.msg.footer
            );
        }

        try {
            const groupId = ctx.isGroup() ? tools.general.getID(ctx.id) : null;
            let setKey;

            switch (input.toLowerCase()) {
                case "antiaudio":
                case "antidocument":
                case "antigif":
                case "antiimage":
                case "antilink":
                case "antinsfw":
                case "antispam":
                case "antisticker":
                case "antitoxic":
                case "antivideo":
                case "autokick":
                case "gamerestrict":
                case "welcome":
                    setKey = `group.${groupId}.option.${input.toLowerCase()}`;
                    break;
                default:
                    return await ctx.reply(quote(`❎ La Clave '${input}' no es válida!`));
            }

            const currentStatus = await db.get(setKey);
            const newStatus = !currentStatus;

            await db.set(setKey, newStatus);
            const statusText = newStatus ? "Activado" : "Desactivado";
            return await ctx.reply(quote(`✅ Función '${input}' fue ${statusText}!`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};