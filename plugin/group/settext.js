const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "settext",
    aliases: ["settxt"],
    category: "group",
    permissions: {
        admin: true,
        botAdmin: true,
        group: true
    },
    code: async (ctx) => {
        const key = ctx.args[0];
        const text = ctx.args.slice(1).join(" ") || ctx.quoted.conversation || Object.values(ctx.quoted).map(v => v?.text || v?.caption).find(Boolean) || null;

        if (!key && !text) return await ctx.reply(
            `${quote(`${tools.cmd.generateInstruction(["send"], ["text"])}`)}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "Bienvenidx al grupo!"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`, "Responda o cite el mensaje para que el texto sea la entrada de destino, si el texto requiere una nueva línea."]))
        );

        if (key === "list") {
            const listText = await tools.list.get("settext");
            return await ctx.reply(listText);
        }

        try {
            const groupId = ctx.isGroup() ? tools.general.getID(ctx.id) : null;
            let setKey;

            switch (key.toLowerCase()) {
                case "goodbye":
                case "intro":
                case "welcome":
                    setKey = `group.${groupId}.text.${input.toLowerCase()}`;
                    break;
                default:
                    return await ctx.reply(quote(`❎ Clave '${key}' no válida!`));
            }

            await db.set(setKey, text);
            return await ctx.reply(quote(`✅ ¡El mensaje para la clave '${key}' se guardó correctamente!`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};