const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "setname",
    category: "group",
    permissions: {
        admin: true,
        botAdmin: true,
        group: true
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "Waguri Ai"))
        );

        try {
            await ctx.group().updateSubject(input);

            return await ctx.reply(quote("✅ ¡El nombre del grupo se cambió exitosamente!"));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};