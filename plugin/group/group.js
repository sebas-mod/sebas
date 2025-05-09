const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "group",
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
            `${quote(tools.cmd.generateCommandExample(ctx.used, "open"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`]))
        );

        if (input === "list") {
            const listText = await tools.list.get("group");
            return await ctx.reply(listText);
        }

        try {
            switch (input.toLowerCase()) {
                case "open":
                case "close":
                case "lock":
                case "unlock":
                    await ctx.group()[input.toLowerCase()]();
                    break;
                default:
                    return await ctx.reply(quote("❎ ¡Texto inválido!"));
            }

            return await ctx.reply(quote("✅ ¡La configuración del grupo se modificó correctamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};