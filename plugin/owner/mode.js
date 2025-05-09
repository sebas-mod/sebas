const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "mode",
    alises: ["m"],
    category: "owner",
    permissions: {
        owner: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(`${tools.cmd.generateInstruction(["send"], ["text"])}`)}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "self"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`]))
        );

        if (input === "list") {
            const listText = await tools.list.get("mode");
            return await ctx.reply(listText);
        }

        try {
            switch (input.toLowerCase()) {
                case "group":
                case "private":
                case "public":
                case "self":
                    await db.set("bot.mode", input.toLowerCase());
                    break;
                default:
                    return await ctx.reply(quote("❎ Texto inválido."));
            }

            return await ctx.reply(quote(`✅ El modo se cambió exitosamente a ${input}!`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};