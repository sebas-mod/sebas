const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "afk",
    category: "profile",
    permissions: {},
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        try {
            await db.set(`user.${tools.general.getID(ctx.sender.jid)}.afk`, {
                reason: input,
                timestamp: Date.now()
            });

            return await ctx.reply(quote(`📴 Ahora estas AFK, ${input ? `razon: "${input}"` : "ninguna"}.`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};